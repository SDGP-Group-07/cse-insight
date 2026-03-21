import React, { useEffect, useMemo, useRef, useState } from 'react';
import companyService from '../../services/companyService';
import { AlertCircle, Check, ChevronDown, Loader2, Search } from 'lucide-react';

const RECENT_COMPANIES_KEY = 'technicalAnalysis:recentCompanies';
const MAX_RECENT_COMPANIES = 5;

const normalizeCompanySymbol = (symbol) => {
    if (!symbol) return null;
    if (symbol.includes(':')) return symbol;
    return `CSELK:${symbol}`;
};

const getRawCompanySymbol = (symbol) => {
    if (!symbol) return null;
    return symbol.includes(':') ? symbol.split(':')[1] : symbol;
};

const extractCompanies = (response) => {
    if (Array.isArray(response?.data?.data)) return response.data.data;

    const payload = response?.data;
    if (Array.isArray(payload)) return payload;
    if (Array.isArray(payload?.companies)) return payload.companies;
    if (Array.isArray(payload?.results)) return payload.results;
    if (Array.isArray(payload?.items)) return payload.items;

    return [];
};

const getCompanySymbol = (company) => {
    return (
        company?.symbol ||
        company?.ticker ||
        company?.code ||
        company?.instrument ||
        company?.symbolCode ||
        company?.securityCode ||
        company?.stockCode ||
        null
    );
};

const getCompanyName = (company) => {
    return (
        company?.name ||
        company?.companyName ||
        company?.displayName ||
        company?.securityName ||
        company?.stockName ||
        null
    );
};

const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const parseRecentCompanies = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const raw = localStorage.getItem(RECENT_COMPANIES_KEY);
        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter((item) => item?.value && item?.label);
    } catch {
        return [];
    }
};

const getMatchScore = (displaySymbolLower, displayNameLower, query) => {
    if (!query) return 99;
    if (displaySymbolLower === query) return 0;
    if (displaySymbolLower.startsWith(query)) return 1;
    if (displayNameLower.startsWith(query)) return 2;
    if (displaySymbolLower.includes(query)) return 3;
    return 4;
};

const renderHighlightedText = (text, query) => {
    if (!query || !text) {
        return text;
    }

    const trimmed = query.trim();
    if (!trimmed) {
        return text;
    }

    const regex = new RegExp(`(${escapeRegExp(trimmed)})`, 'ig');
    const parts = String(text).split(regex);
    const trimmedLower = trimmed.toLowerCase();

    return parts.map((part, index) => (
        part.toLowerCase() === trimmedLower
            ? <span key={`${part}-${index}`} className="text-accent-cyan font-medium">{part}</span>
            : <span key={`${part}-${index}`}>{part}</span>
    ));
};

const CompanySearchDropdown = ({ value, onChange }) => {
    const wrapperRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [recentCompanies, setRecentCompanies] = useState(() => parseRecentCompanies());

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(() => {
        let isMounted = true;

        const loadCompanies = async () => {
            try {
                setLoading(true);
                const response = await companyService.getTechnicalAnalysisCompanies(debouncedSearchTerm);
                const companyList = extractCompanies(response);

                if (!isMounted) return;

                setCompanies(companyList);
                setError('');

            } catch (err) {
                if (!isMounted) return;

                setCompanies([]);
                setError(err?.response?.data?.message || err?.message || 'Failed to load companies');
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadCompanies();

        return () => {
            isMounted = false;
        };
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!wrapperRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const companyOptions = useMemo(() => {
        const mapped = companies
            .map((company) => {
                const rawSymbol = getCompanySymbol(company);
                const normalizedSymbol = normalizeCompanySymbol(rawSymbol);
                const displaySymbol = getRawCompanySymbol(rawSymbol);

                if (!normalizedSymbol || !displaySymbol) {
                    return null;
                }

                const displayName = getCompanyName(company) || rawSymbol;
                return {
                    value: normalizedSymbol,
                    displaySymbol,
                    displayName,
                    label: `${displaySymbol} - ${displayName}`,
                    searchText: `${displaySymbol} ${displayName}`.toLowerCase(),
                };
            })
            .filter(Boolean);

        const normalizedTerm = debouncedSearchTerm.trim().toLowerCase();
        if (!normalizedTerm) {
            return mapped;
        }

        return mapped
            .filter((item) => item.searchText.includes(normalizedTerm))
            .sort((left, right) => {
                const leftScore = getMatchScore(left.displaySymbol.toLowerCase(), left.displayName.toLowerCase(), normalizedTerm);
                const rightScore = getMatchScore(right.displaySymbol.toLowerCase(), right.displayName.toLowerCase(), normalizedTerm);

                if (leftScore !== rightScore) {
                    return leftScore - rightScore;
                }

                return left.displaySymbol.localeCompare(right.displaySymbol);
            });
    }, [companies, debouncedSearchTerm]);

    const recentOptions = useMemo(() => {
        const normalizedTerm = debouncedSearchTerm.trim().toLowerCase();

        return recentCompanies
            .filter((item) => {
                if (!normalizedTerm) {
                    return true;
                }

                return item.label.toLowerCase().includes(normalizedTerm);
            })
            .slice(0, MAX_RECENT_COMPANIES);
    }, [recentCompanies, debouncedSearchTerm]);

    useEffect(() => {
        const currentIndex = companyOptions.findIndex((company) => company.value === value);
        setActiveIndex(currentIndex);
    }, [companyOptions, value]);

    const selectedCompany = useMemo(() => {
        if (!value) {
            return null;
        }

        return companyOptions.find((company) => company.value === value)
            || recentCompanies.find((company) => company.value === value)
            || null;
    }, [companyOptions, recentCompanies, value]);

    const selectCompany = (selectedValue, selectedLabel) => {
        onChange(selectedValue);
        setIsOpen(false);
        setSearchTerm('');
        setDebouncedSearchTerm('');

        if (!selectedValue || !selectedLabel) {
            return;
        }

        setRecentCompanies((prev) => {
            const next = [
                { value: selectedValue, label: selectedLabel },
                ...prev.filter((item) => item.value !== selectedValue),
            ].slice(0, MAX_RECENT_COMPANIES);

            if (typeof window !== 'undefined') {
                localStorage.setItem(RECENT_COMPANIES_KEY, JSON.stringify(next));
            }

            return next;
        });
    };

    const handleKeyDown = (event) => {
        if (!isOpen && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            setIsOpen(true);
            return;
        }

        if (!isOpen) {
            return;
        }

        if (event.key === 'Escape') {
            setIsOpen(false);
            return;
        }

        if (event.key === 'ArrowDown') {
            event.preventDefault();
            setActiveIndex((prev) => {
                if (!companyOptions.length) return -1;
                return prev >= companyOptions.length - 1 ? 0 : prev + 1;
            });
        }

        if (event.key === 'ArrowUp') {
            event.preventDefault();
            setActiveIndex((prev) => {
                if (!companyOptions.length) return -1;
                return prev <= 0 ? companyOptions.length - 1 : prev - 1;
            });
        }

        if (event.key === 'Enter' && activeIndex >= 0 && companyOptions[activeIndex]) {
            event.preventDefault();
            const option = companyOptions[activeIndex];
            selectCompany(option.value, option.label);
        }
    };


    return (
        <div className="space-y-2" ref={wrapperRef}>
            <div className="relative" onKeyDown={handleKeyDown}>
                <button
                    type="button"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-left text-sm text-gray-200 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className="flex items-center justify-between gap-3">
                        <span className="truncate">
                            {selectedCompany ? selectedCompany.label : 'Select Company'}
                        </span>
                        <ChevronDown size={16} className={`shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </span>
                </button>

                {isOpen && (
                    <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/15 bg-primary-dark shadow-2xl">
                        <div className="border-b border-white/10 p-2">
                            <div className="relative">
                                <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by symbol or company"
                                    className="w-full rounded-lg border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-sm text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                />
                            </div>
                        </div>

                        <div className="max-h-64 overflow-y-auto p-1.5">
                            {!loading && recentOptions.length > 0 && (
                                <div className="mb-1 px-3 py-1 text-[11px] uppercase tracking-wide text-gray-500">Recent</div>
                            )}

                            {!loading && recentOptions.map((company) => {
                                const isSelected = company.value === value;
                                return (
                                    <button
                                        key={`recent-${company.value}`}
                                        type="button"
                                        onClick={() => selectCompany(company.value, company.label)}
                                        className={`mb-1 flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                                ? 'bg-accent-cyan/20 text-accent-cyan'
                                                : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        <span className="truncate">{renderHighlightedText(company.label, debouncedSearchTerm)}</span>
                                        {isSelected && <Check size={15} className="shrink-0" />}
                                    </button>
                                );
                            })}

                            {!loading && recentOptions.length > 0 && (
                                <div className="my-1 border-t border-white/10" />
                            )}

                            {loading && (
                                <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-300">
                                    <Loader2 size={15} className="animate-spin" />
                                    Loading companies...
                                </div>
                            )}

                            {!loading && companyOptions.length === 0 && (
                                <div className="rounded-lg px-3 py-2 text-sm text-gray-400">No companies found</div>
                            )}

                            {!loading && companyOptions.map((company, index) => {
                                const isSelected = company.value === value;
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={company.value}
                                        type="button"
                                        onMouseEnter={() => setActiveIndex(index)}
                                        onClick={() => {
                                            selectCompany(company.value, company.label);
                                        }}
                                        className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                            isSelected
                                                ? 'bg-accent-cyan/20 text-accent-cyan'
                                                : isActive
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                    >
                                        <span className="truncate">
                                            {renderHighlightedText(company.displaySymbol, debouncedSearchTerm)}
                                            <span className="text-gray-500 mx-1">-</span>
                                            <span className="text-gray-300">{renderHighlightedText(company.displayName, debouncedSearchTerm)}</span>
                                        </span>
                                        {isSelected && <Check size={15} className="shrink-0" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {!loading && error && (
                <span className="flex items-center gap-1 text-xs text-red-400" title={error}>
                    <AlertCircle size={12} /> {error}
                </span>
            )}
        </div>
    );
};

export default CompanySearchDropdown;
 