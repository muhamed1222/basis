export interface Tariff {
  id: string;
  name: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export interface BillingInfo {
  tariff: Tariff;
  paymentMethod: string;
  autoRenew: boolean;
}

export interface PaymentHistoryItem {
  date: string;
  amount: string;
  status: string;
  invoiceId: string;
  invoiceLink?: string;
}

const defaultTariffs: Tariff[] = [
  {
    id: 'free',
    name: 'Free',
    price: '0₽',
    features: ['1 страница', 'Базовые блоки', 'Поддержка Basis'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '499₽',
    features: [
      '10 страниц',
      'Все блоки',
      'Кастомный домен',
      'Аналитика',
      'Приоритетная поддержка',
    ],
    popular: true,
  },
  {
    id: 'business',
    name: 'Business',
    price: '1499₽',
    features: [
      'Безлимит страниц',
      'Командный доступ',
      'API доступ',
      'Персональный менеджер',
    ],
  },
];

const defaultBilling: BillingInfo = {
  tariff: defaultTariffs[0],
  paymentMethod: 'Карта Visa **** **** **** 1234 (действительна до 12/25)',
  autoRenew: true,
};

const STORAGE_KEY = 'billing_info';

function loadBilling(): BillingInfo {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      const data = JSON.parse(raw) as BillingInfo;
      return { ...defaultBilling, ...data };
    } catch {
      return defaultBilling;
    }
  }
  return defaultBilling;
}

function saveBilling(info: BillingInfo) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
}

export async function getTariffs(): Promise<Tariff[]> {
  return defaultTariffs;
}

export async function getBillingInfo(): Promise<BillingInfo> {
  return loadBilling();
}

export async function switchTariff(tariffId: string): Promise<void> {
  const info = loadBilling();
  const found = defaultTariffs.find((t) => t.id === tariffId);
  if (found) {
    info.tariff = found;
    saveBilling(info);
  } else {
    throw new Error('Тариф не найден');
  }
}

export async function updatePaymentMethod(): Promise<void> {
  const info = loadBilling();
  info.paymentMethod = 'Обновленный способ оплаты';
  saveBilling(info);
}

export async function toggleAutoRenew(value: boolean): Promise<void> {
  const info = loadBilling();
  info.autoRenew = value;
  saveBilling(info);
}

export async function getPaymentHistory(): Promise<PaymentHistoryItem[]> {
  return [
    {
      date: '01.08.2024',
      amount: '499₽',
      status: 'Оплачено',
      invoiceId: 'INV-2024-001',
      invoiceLink: '#',
    },
    {
      date: '01.07.2024',
      amount: '499₽',
      status: 'Оплачено',
      invoiceId: 'INV-2024-002',
      invoiceLink: '#',
    },
    {
      date: '01.06.2024',
      amount: '499₽',
      status: 'Оплачено',
      invoiceId: 'INV-2024-003',
      invoiceLink: '#',
    },
  ];
}
