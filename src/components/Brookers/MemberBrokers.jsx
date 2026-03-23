import React, { useEffect, useMemo, useState } from 'react';
import {
	Globe,
	Mail,
	MapPin,
	Phone,
	Printer,
	Search,
	ShieldCheck,
	UserRound,
} from 'lucide-react';
import BrokerService from '../../services/BrokerService';

const brokerLogoModules = import.meta.glob(
	'../../assets/imgs/brokers/*.{png,jpg,jpeg,webp,svg}',
	{ eager: true, import: 'default' },
);

const brokerLogosByFile = Object.fromEntries(
	Object.entries(brokerLogoModules).map(([path, value]) => {
		const fileName = path.split('/').pop();
		return [fileName, value];
	}),
);

const normalizeLogoFileKey = (fileName) => {
	if (!fileName) {

		return '';
	}

	return fileName
		.toLowerCase()
		.replace(/'/g, '')
		// Handle names like "logo.png.png" by removing repeated extensions./
		.replace(/(\.(png|jpg|jpeg|webp|svg))+$/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
};

const brokerLogosByKey = Object.fromEntries(
	Object.entries(brokerLogosByFile).map(([fileName, value]) => [
		
		normalizeLogoFileKey(fileName),
		value,
	]),
);

const brokerLogoKeyMap = {
	'bartleet religare securities': 'bartleet-religare',
	'hnb stockbrokers': 'hnb-stockbrokers',
	'hnb stock brokers': 'hnb-stockbrokers',
	'john keells stock brokers': 'john-keells-stock-brokers',
	'asha securities': 'asia-securities-limited',
	'almas equities': 'almas-equities',
	'somerville stockbrokers': 'somerville-stockbrokers',
	'somerville stock brokers': 'somerville-stockbrokers',
	'j b securities': 'jb-securities',
	'lanka securities': 'ubsl',
	'asia securities': 'asia-securities',
	'capital trust securities': 'capital-trust-securities',
	'sampath securities': 'sampath-securities',
	'ct smith securities': 'ct-smith-securities',
	'first capital equities': 'first-capital',
	'ndb securities': 'ndb-securities',
	'acs capital': 'acs-capital',
};

const normalizeBrokerName = (name) => {
	if (!name) {
		return '';
	}

	return name
		.toLowerCase()
		.replace(/\(pvt\)|ltd\.?|limited|private|stock\s*brokers?/g, (match) => {
			if (match.includes('stock')) {
				return 'stock brokers';
			}
			if (match.includes('limited') || match.includes('ltd')) {
				return '';
			}
			return '';
		})
		.replace(/[^a-z0-9\s]/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();
};

const resolveBrokerLogo = (name, apiLogo) => {
	const normalizedName = normalizeBrokerName(name);
	const mappedLogoKey =
		brokerLogoKeyMap[normalizedName] || normalizedName.replace(/\s+/g, '-');

	if (mappedLogoKey && brokerLogosByKey[mappedLogoKey]) {
		return brokerLogosByKey[mappedLogoKey];
	}

	// Fallback for slightly mismatched file keys.
	const fuzzyKey = Object.keys(brokerLogosByKey).find(
		(key) => key.includes(mappedLogoKey) || mappedLogoKey.includes(key),
	);
	if (fuzzyKey) {
		return brokerLogosByKey[fuzzyKey];
	}

	if (typeof apiLogo === 'string' && apiLogo.trim()) {
		return apiLogo;
	}

	return '';
};

const valueFrom = (source, keys) => {
	for (const key of keys) {
		const value = source?.[key];
		if (typeof value === 'string' && value.trim()) {
			return value.trim();
		}
		if (typeof value === 'number') {
			return String(value);
		}
	}
	return '';
};

const listFrom = (value) => {
	if (Array.isArray(value)) {
		return value.filter(Boolean);
	}
	if (value && typeof value === 'object') {
		return Object.values(value).filter(Boolean);
	}
	return [];
};

const normalizeWebsite = (website) => {
	if (!website) {
		return { label: '', href: '' };
	}

	const trimmed = website.trim();
	return {
		label: trimmed.replace(/^https?:\/\//i, ''),
		href: /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`,
	};
};

const getInitials = (name) => {
	return name
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() || '')
		.join('');
};

const buildRepresentatives = (broker) => {
	const repCollections = [
		broker?.representatives,
		broker?.members,
		broker?.officials,
		broker?.contacts,
		broker?.contactPersons,
		broker?.keyContacts,
	];

	const normalizedList = repCollections
		.flatMap((entry) => listFrom(entry))
		.map((person) => {
			if (typeof person === 'string') {
				return { name: person, role: 'Representative' };
			}

			const name = valueFrom(person, ['name', 'fullName', 'contactName', 'personName']);
			const role = valueFrom(person, ['role', 'designation', 'contactDesignation', 'title', 'position']) || 'Representative';
			return name ? { name, role } : null;
		})
		.filter(Boolean);

	if (normalizedList.length > 0) {
		return normalizedList.slice(0, 4);
	}

	const fallbackContacts = [
		{
			name: valueFrom(broker, ['directorName', 'ceo', 'ceoName', 'director', 'chiefExecutiveOfficer']),
			role: 'Director / CEO',
		},
		{
			name: valueFrom(broker, ['complianceOfficer', 'complianceOfficerName', 'compliance']),
			role: 'Compliance Officer',
		},
	].filter((person) => person.name);

	return fallbackContacts;
};

const normalizeBroker = (broker, index) => {
	const name =
		valueFrom(broker, ['name', 'brokerName', 'memberName', 'companyName']) ||
		'Unnamed Broker';
	const website = normalizeWebsite(
		valueFrom(broker, ['website', 'webSite', 'url', 'siteUrl', 'web']),
	);

	return {
		id: valueFrom(broker, ['id', 'memberId', 'brokerId']) || `broker-${index}`,
		name,
		address: valueFrom(broker, ['address', 'companyAddress', 'registeredAddress', 'location', 'officeAddress']),
		phone: valueFrom(broker, ['phone', 'telephone', 'telephoneNo', 'phoneNumber', 'contactNo']),
		fax: valueFrom(broker, ['fax', 'faxNo', 'facsimile']),
		email: valueFrom(broker, ['email', 'emailAddress', 'contactEmail']),
		websiteLabel: website.label,
		websiteHref: website.href,
		license: valueFrom(broker, ['license', 'licenseNo', 'memberCode', 'brokerCode']),
		city: valueFrom(broker, ['city', 'district', 'town']),
		logo: resolveBrokerLogo(
			name,
			valueFrom(broker, ['logo', 'logoUrl', 'imageUrl', 'image']),
		),
		representatives: buildRepresentatives(broker),
	};
};

const MemberBrokers = () => {
	const [brokers, setBrokers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	useEffect(() => {
		let isMounted = true;

		const loadBrokers = async () => {
			try {
				setIsLoading(true);
				setLoadError('');
				const rawBrokers = await BrokerService.getMemberBrokers();

				const normalized = rawBrokers.map(normalizeBroker).filter((broker) => broker.name);

				if (!isMounted) {
					return;
				}

				if (normalized.length > 0) {
					setBrokers(normalized);
				} else {
					setBrokers([]);
					setLoadError('No member broker data was returned by the API.');
				}
			} catch {
				if (!isMounted) {
					return;
				}

				setBrokers([]);
				setLoadError('Unable to load member broker data from the API right now.');
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		};

		loadBrokers();

		return () => {
			isMounted = false;
		};
	}, []);

	const filteredBrokers = useMemo(() => {
		const query = searchTerm.trim().toLowerCase();

		if (!query) {
			return brokers;
		}

		return brokers.filter((broker) => {
			const haystack = [
				broker.name,
				broker.address,
				broker.city,
				broker.email,
				broker.websiteLabel,
				...broker.representatives.map((person) => `${person.name} ${person.role}`),
			]
				.join(' ')
				.toLowerCase();

			return haystack.includes(query);
		});
	}, [brokers, searchTerm]);

	const totalPages = Math.max(1, Math.ceil(filteredBrokers.length / itemsPerPage));
	const paginatedBrokers = useMemo(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredBrokers.slice(startIndex, startIndex + itemsPerPage);
	}, [currentPage, filteredBrokers]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, brokers.length]);

	useEffect(() => {
		if (currentPage > totalPages) {
			setCurrentPage(totalPages);
		}
	}, [currentPage, totalPages]);

	return (
		<div className="relative mx-auto max-w-7xl">
					<section className="rounded-[1.6rem] border border-white/10 bg-primary-mid/60 px-5 py-4 backdrop-blur-md sm:px-6">
						<div className="flex flex-wrap items-center justify-between gap-3">
							<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.24em] text-white">
								<ShieldCheck size={30} className="text-accent-cyan" />
								CSE Member Brokers
							</div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
								{isLoading ? 'Loading...' : `${filteredBrokers.length} Listed Brokers`}
							</p>
						</div>
					</section>

					<section className="mt-4 rounded-[2rem] border border-white/10 bg-primary-mid/60 p-5 backdrop-blur-md sm:p-6 lg:p-7">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
							<div>
								<p className="text-[11px] font-black uppercase tracking-[0.28em] text-gray-500">
									Directory Search
								</p>
								<h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-white">
									Broker Members
								</h2>
							</div>

							<div className="relative w-full max-w-xl">
								<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
								<input
									type="text"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									placeholder="Search by broker, city, email, website, or representative"
									className="w-full rounded-2xl border border-white/10 bg-white/5 px-12 py-3.5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-accent-cyan focus:ring-4 focus:ring-accent-cyan/20"
								/>
							</div>
						</div>

						{loadError && (
							<div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
								{loadError}
							</div>
						)}

						{isLoading ? (
							<div className="mt-6 grid gap-5">
								{Array.from({ length: 6 }).map((_, index) => (
									<div
										key={`skeleton-${index}`}
										className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-6"
									>
										<div className="h-10 w-28 rounded-full bg-slate-200" />
										<div className="mt-6 h-7 w-3/4 rounded-full bg-slate-200" />
										<div className="mt-3 h-px w-full bg-slate-200" />
										<div className="mt-5 space-y-3">
											<div className="h-4 w-full rounded-full bg-slate-200" />
											<div className="h-4 w-5/6 rounded-full bg-slate-200" />
											<div className="h-4 w-2/3 rounded-full bg-slate-200" />
										</div>
										<div className="mt-8 space-y-3">
											<div className="h-12 rounded-2xl bg-slate-100" />
											<div className="h-12 rounded-2xl bg-slate-100" />
										</div>
									</div>
								))}
							</div>
						) : (
							<>
								<div className="mt-5 flex items-center justify-between gap-4">
									{/* <p className="text-sm font-semibold text-slate-600">
										Showing <span className="text-slate-950">{filteredBrokers.length}</span> broker{filteredBrokers.length === 1 ? '' : 's'}
									</p> */}
									{/* {filteredBrokers.length > 0 && (
										<p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
											Page {currentPage} / {totalPages}
										</p>
									)} */}
								</div>

								{filteredBrokers.length === 0 ? (
									<div className="mt-6 rounded-[1.8rem] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
										<p className="text-lg font-bold text-slate-900">No brokers matched your search.</p>
										<p className="mt-2 text-sm text-slate-500">Try a broker name, city, email, or representative name.</p>
									</div>
								) : (
									<>
										<div className="mt-6 grid grid-cols-4 gap-5">
											{paginatedBrokers.map((broker) => (
											<article
												key={broker.id}
												className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-primary-mid/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary-mid/80 hover:shadow-[0_10px_30px_rgba(0,245,212,0.1)]"
											>
												<div className="px-6 pb-0 pt-6">
													<div className="flex justify-center">
														{broker.logo ? (
															<img
																src={broker.logo}
																alt={broker.name}
																className="h-16 w-32 object-contain"
															/>
														) : (
															<div className="flex h-16 w-32 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-sm font-black tracking-wide text-white">
																{getInitials(broker.name)}
															</div>
														)}
													</div>

													<p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-gray-500">
																											</p>

													<h3 className="mx-auto mt-2 max-w-[18rem] text-center text-sm font-black uppercase leading-tight text-white">
														{broker.name}
													</h3>

													<div className="my-5 h-px bg-white/10" />

													<div className="space-y-2 text-xs text-gray-400">
														{broker.address && (
															<div className="flex items-start gap-3">
																<MapPin size={14} className="mt-0.5 shrink-0 text-accent-cyan" />
																<span className="text-xs leading-tight text-gray-300">{broker.address}</span>
															</div>
														)}
														{broker.phone && (
															<div className="flex items-center gap-3">
																<Phone size={14} className="shrink-0 text-accent-cyan" />
																<span className="text-xs text-gray-300">{broker.phone}</span>
															</div>
														)}
														{broker.fax && (
															<div className="flex items-center gap-3">
																<Printer size={14} className="shrink-0 text-accent-cyan" />
																<span className="text-xs text-gray-300">{broker.fax}</span>
															</div>
														)}
														{broker.email && (
															<div className="flex items-center gap-3">
																<Mail size={14} className="shrink-0 text-accent-cyan" />
																<a
																	href={`mailto:${broker.email}`}
																className="truncate text-xs text-accent-cyan transition hover:text-white hover:underline"
																>
																	{broker.email}
																</a>
															</div>
														)}
														{broker.websiteHref && (
															<div className="flex items-center gap-3">
																<Globe size={14} className="shrink-0 text-accent-cyan" />
																<a
																	href={broker.websiteHref}
																	target="_blank"
																	rel="noreferrer"
																className="truncate text-xs text-accent-cyan transition hover:text-white hover:underline"
																>
																	{broker.websiteLabel}
																</a>
															</div>
														)}
													</div>
												</div>

													{broker.representatives.length > 0 && (
														<div className="mt-6 border-t border-white/10 bg-white/5 px-6 py-5">
															<div className="space-y-4">
																{broker.representatives.map((person, personIndex) => (
																	<div key={`${broker.id}-${person.name}-${personIndex}`} className="flex items-center gap-3">
																		<div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-cyan/20 text-accent-cyan">
																			<UserRound size={14} />
																		</div>
																		<div className="min-w-0">
																			<p className="truncate text-xs font-black text-white">{person.name}</p>
																			<p className="text-[10px] text-gray-400">{person.role}</p>
																		</div>
																	</div>
																))}
															</div>
														</div>
													)}
											</article>
											))}
										</div>

										{totalPages > 1 && (
											<div className="mt-8 flex flex-wrap items-center justify-center gap-2">
											<button
												type="button"
												onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
												disabled={currentPage === 1}
												className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
											>
												Prev
											</button>

											{Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNumber) => (
												<button
													key={pageNumber}
													type="button"
													onClick={() => setCurrentPage(pageNumber)}
													className={`rounded-xl border px-4 py-2 text-sm font-bold transition ${
														currentPage === pageNumber
															? 'border-accent-cyan bg-accent-cyan/20 text-accent-cyan'
															: 'border-white/10 bg-white/5 text-white hover:bg-white/10'
													}`}
												>
													{pageNumber}
												</button>
											))}

											<button
												type="button"
												onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
												disabled={currentPage === totalPages}
												className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
											>
												Next
											</button>
											</div>
										)}
									</>
								)}
							</>
						)}
					</section>
	</div>
	);
};

export default MemberBrokers;
