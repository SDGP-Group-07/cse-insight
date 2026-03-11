import React, { useEffect, useMemo, useState } from 'react';
import {
	ArrowUpRight,
	Building2,
	Globe,
	Landmark,
	Mail,
	MapPin,
	Phone,
	Search,
	ShieldCheck,
	Users,
} from 'lucide-react';
import Header from '../common/Header';
import BrokerService from '../../services/BrokerService';

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
	const website = normalizeWebsite(
		valueFrom(broker, ['website', 'webSite', 'url', 'siteUrl', 'web']),
	);

	return {
		id: valueFrom(broker, ['id', 'memberId', 'brokerId']) || `broker-${index}`,
		name: valueFrom(broker, ['name', 'brokerName', 'memberName', 'companyName']) || 'Unnamed Broker',
		address: valueFrom(broker, ['address', 'companyAddress', 'registeredAddress', 'location', 'officeAddress']),
		phone: valueFrom(broker, ['phone', 'telephone', 'telephoneNo', 'phoneNumber', 'contactNo']),
		fax: valueFrom(broker, ['fax', 'faxNo', 'facsimile']),
		email: valueFrom(broker, ['email', 'emailAddress', 'contactEmail']),
		websiteLabel: website.label,
		websiteHref: website.href,
		license: valueFrom(broker, ['license', 'licenseNo', 'memberCode', 'brokerCode']),
		city: valueFrom(broker, ['city', 'district', 'town']),
		logo: valueFrom(broker, ['logo', 'logoUrl', 'imageUrl', 'image']),
		representatives: buildRepresentatives(broker),
	};
};

const MemberBrokers = () => {
	const [brokers, setBrokers] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [loadError, setLoadError] = useState('');

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

	const stats = useMemo(() => {
		const total = brokers.length;
		const withWebsites = brokers.filter((broker) => broker.websiteHref).length;
		const withEmail = brokers.filter((broker) => broker.email).length;
		const representatives = brokers.reduce(
			(count, broker) => count + broker.representatives.length,
			0,
		);

		return [
			{
				label: 'Registered Members',
				value: isLoading ? '...' : String(total).padStart(2, '0'),
				icon: Building2,
				accent: 'text-sky-600',
				chip: 'bg-sky-100 text-sky-700',
			},
			{
				label: 'Broker Websites',
				value: isLoading ? '...' : String(withWebsites).padStart(2, '0'),
				icon: Globe,
				accent: 'text-cyan-600',
				chip: 'bg-cyan-100 text-cyan-700',
			},
			{
				label: 'Contact Points',
				value: isLoading ? '...' : String(withEmail + representatives).padStart(2, '0'),
				icon: Users,
				accent: 'text-indigo-600',
				chip: 'bg-indigo-100 text-indigo-700',
			},
		];
	}, [brokers, isLoading]);

	return (
		<div className="min-h-screen overflow-hidden bg-primary-dark text-white font-sans">
			<Header />

			<main className="relative px-4 pb-16 pt-24 sm:px-6 lg:px-8">
				<div className="pointer-events-none absolute inset-0 overflow-hidden">
					<div className="absolute left-[-8rem] top-24 h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
					<div className="absolute right-[-6rem] top-40 h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
					<div className="absolute inset-x-0 top-0 h-[22rem] bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.24),_transparent_58%)]" />
				</div>

				<div className="relative mx-auto max-w-7xl">
					<section className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-300 text-slate-900 shadow-[0_35px_80px_rgba(2,6,23,0.35)]">
						<div className="grid gap-8 px-6 py-8 sm:px-8 lg:grid-cols-[1.3fr_0.9fr] lg:px-10 lg:py-10">
							<div>
								<div className="inline-flex items-center gap-2 rounded-full border border-slate-300/80 bg-white/70 px-3 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-slate-600">
									<ShieldCheck size={14} className="text-sky-600" />
									CSE Member Brokers
								</div>

								<h1 className="mt-5 max-w-3xl text-3xl font-black uppercase tracking-tight text-slate-950 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.05]">
									Member brokers directory with a sharper, cleaner market-facing presentation.
								</h1>

								<p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
									Designed around the layout you shared, with a stronger visual hierarchy, softer dividend-calendar-style page atmosphere, and broker cards that surface contact details without feeling cramped.
								</p>

								<div className="mt-6 flex flex-wrap gap-3">
									<div className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/10">
										<Landmark size={16} className="text-cyan-300" />
										Verified member broker contacts
									</div>
									<div className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700">
										<Users size={16} className="text-indigo-500" />
										Built for quick lookup and comparison
									</div>
								</div>
							</div>

							<div className="grid gap-3 self-end sm:grid-cols-3 lg:grid-cols-1">
								{stats.map((item) => (
									<div
										key={item.label}
										className="rounded-[1.6rem] border border-white/70 bg-white/75 p-4 backdrop-blur-sm"
									>
										<div className={`inline-flex rounded-2xl p-3 ${item.chip}`}>
											<item.icon size={18} className={item.accent} />
										</div>
										<p className="mt-4 text-[11px] font-black uppercase tracking-[0.24em] text-slate-500">
											{item.label}
										</p>
										<p className="mt-1 text-3xl font-black text-slate-950">{item.value}</p>
									</div>
								))}
							</div>
						</div>
					</section>

					<section className="mt-8 rounded-[2rem] border border-white/10 bg-slate-100/95 p-5 shadow-[0_25px_70px_rgba(15,23,42,0.18)] backdrop-blur-md sm:p-6 lg:p-7">
						<div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
							<div>
								<p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-500">
									Directory Search
								</p>
								<h2 className="mt-2 text-2xl font-black uppercase tracking-tight text-slate-900">
									Find a member broker in seconds
								</h2>
							</div>

							<div className="relative w-full max-w-xl">
								<Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
								<input
									type="text"
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									placeholder="Search by broker, city, email, website, or representative"
									className="w-full rounded-2xl border border-slate-300 bg-white px-12 py-3.5 text-sm text-slate-800 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
								/>
							</div>
						</div>

						{loadError && (
							<div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
								{loadError}
							</div>
						)}

						{isLoading ? (
							<div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
									<p className="text-sm font-semibold text-slate-600">
										Showing <span className="text-slate-950">{filteredBrokers.length}</span> broker{filteredBrokers.length === 1 ? '' : 's'}
									</p>
								</div>

								{filteredBrokers.length === 0 ? (
									<div className="mt-6 rounded-[1.8rem] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
										<p className="text-lg font-bold text-slate-900">No brokers matched your search.</p>
										<p className="mt-2 text-sm text-slate-500">Try a broker name, city, email, or representative name.</p>
									</div>
								) : (
									<div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
										{filteredBrokers.map((broker, index) => (
											<article
												key={broker.id}
												className="group relative overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_70px_rgba(14,116,144,0.16)]"
											>
												<div className="absolute inset-x-0 bottom-0 h-32 bg-[linear-gradient(135deg,rgba(186,230,253,0.36),rgba(226,232,240,0.15)_55%,rgba(191,219,254,0.34))]" />
												<div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-sky-100/60 blur-2xl transition duration-300 group-hover:bg-cyan-100/70" />

												<div className="relative">
													<div className="flex items-start justify-between gap-4">
														<div className="flex min-w-0 items-center gap-4">
															{broker.logo ? (
																<img
																	src={broker.logo}
																	alt={broker.name}
																	className="h-14 w-20 rounded-2xl border border-slate-200 bg-white object-contain p-2"
																/>
															) : (
																<div className="flex h-14 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-cyan-500 text-lg font-black text-white shadow-lg shadow-sky-200">
																	{getInitials(broker.name)}
																</div>
															)}

															<div className="min-w-0">
																<p className="text-[10px] font-black uppercase tracking-[0.28em] text-slate-400">
																	Member {String(index + 1).padStart(2, '0')}
																</p>
																<h3 className="mt-2 line-clamp-2 text-2xl font-black uppercase leading-tight text-slate-950">
																	{broker.name}
																</h3>
															</div>
														</div>

														{broker.websiteHref && (
															<a
																href={broker.websiteHref}
																target="_blank"
																rel="noreferrer"
																className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-500 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
																aria-label={`Visit ${broker.name} website`}
															>
																<ArrowUpRight size={18} />
															</a>
														)}
													</div>

													<div className="my-5 h-px bg-slate-200" />

													<div className="space-y-3 text-[15px] text-slate-600">
														{broker.address && (
															<div className="flex items-start gap-3">
																<MapPin size={18} className="mt-0.5 shrink-0 text-sky-600" />
																<span>{broker.address}</span>
															</div>
														)}
														{broker.phone && (
															<div className="flex items-center gap-3">
																<Phone size={18} className="shrink-0 text-cyan-600" />
																<span>{broker.phone}</span>
															</div>
														)}
														{broker.fax && (
															<div className="flex items-center gap-3">
																<Landmark size={18} className="shrink-0 text-indigo-500" />
																<span>{broker.fax}</span>
															</div>
														)}
														{broker.email && (
															<div className="flex items-center gap-3">
																<Mail size={18} className="shrink-0 text-blue-600" />
																<a
																	href={`mailto:${broker.email}`}
																	className="truncate text-sky-600 transition hover:text-sky-800 hover:underline"
																>
																	{broker.email}
																</a>
															</div>
														)}
														{broker.websiteHref && (
															<div className="flex items-center gap-3">
																<Globe size={18} className="shrink-0 text-sky-700" />
																<a
																	href={broker.websiteHref}
																	target="_blank"
																	rel="noreferrer"
																	className="truncate text-sky-600 transition hover:text-sky-800 hover:underline"
																>
																	{broker.websiteLabel}
																</a>
															</div>
														)}
													</div>

													{broker.representatives.length > 0 && (
														<div className="relative mt-6 border-t border-slate-200 pt-5">
															<div className="space-y-3">
																{broker.representatives.map((person, personIndex) => (
																	<div key={`${broker.id}-${person.name}-${personIndex}`} className="flex items-center gap-3">
																		<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-indigo-100 text-sky-700">
																			<Users size={18} />
																		</div>
																		<div className="min-w-0">
																			<p className="truncate text-base font-bold text-slate-900">{person.name}</p>
																			<p className="text-sm text-slate-500">{person.role}</p>
																		</div>
																	</div>
																))}
															</div>
														</div>
													)}
												</div>
											</article>
										))}
									</div>
								)}
							</>
						)}
					</section>
				</div>
			</main>
		</div>
	);
};

export default MemberBrokers;
