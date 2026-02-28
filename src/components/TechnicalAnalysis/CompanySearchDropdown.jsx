import React, { useEffect, useMemo, useState } from 'react';
import companyService from '../../services/companyService';

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

const CompanySearchDropdown = ({ value, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

                if (companyList.length > 0 && !value) {
                    const firstSymbol = normalizeCompanySymbol(getCompanySymbol(companyList[0]));
                    if (firstSymbol) {
                        onChange(firstSymbol);
                    }
                }
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
    }, [debouncedSearchTerm, onChange, value]);

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
                    label: `${displaySymbol} - ${displayName}`,
                    searchText: `${displaySymbol} ${displayName}`.toLowerCase(),
                };
            })
            .filter(Boolean);

        const normalizedTerm = debouncedSearchTerm.trim().toLowerCase();
        if (!normalizedTerm) {
            return mapped;
        }

        return mapped.filter((item) => item.searchText.includes(normalizedTerm));
    }, [companies, debouncedSearchTerm]);

    useEffect(() => {
        if (!value && companyOptions.length > 0) {
            onChange(companyOptions[0].value);
            return;
        }

        if (value && companyOptions.length > 0) {
            const exists = companyOptions.some((item) => item.value === value);
            if (!exists) {
                onChange(companyOptions[0].value);
            }
        }
    }, [companyOptions, onChange, value]);

    return (
        <div className="space-y-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search company"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            />
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-cyan"
            >
                {loading && <option value="">Loading companies...</option>}
                {!loading && companyOptions.length === 0 && <option value="">No companies found</option>}
                {!loading && companyOptions.map((company) => (
                    <option key={company.value} value={company.value}>
                        {company.label}
                    </option>
                ))}
            </select>
            {!loading && error && (
                <span className="block text-xs text-red-400 truncate" title={error}>
                    {error}
                </span>
            )}
        </div>
    );
};

export default CompanySearchDropdown;
