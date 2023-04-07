import type { orderState } from '@prisma/client';

const getCurrentThemeMode = () => {
  if (typeof window !== 'undefined') {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      return 'dark' as const;
    } else {
      return 'light' as const;
    }
  }
  return 'light' as const;
};

// hack to force nextauth to reload session
const reloadSession = () => {
  const event = new Event('visibilitychange');
  document.dispatchEvent(event);
};

// get order status color.
const getOrderStatusColor = (state: orderState) => {
  switch (state) {
    case 'CANCELLED':
      return 'text-red-500';

    case 'DONE':
      return 'text-green-500';

    case 'PENDING':
      return 'text-orange-500';

    case 'PROCESSSING':
      return 'text-yellow-500';
  }
};

export { getCurrentThemeMode, reloadSession, getOrderStatusColor };
