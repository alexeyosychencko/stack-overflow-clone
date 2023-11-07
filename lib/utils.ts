import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTimestamp = (createdAt: Date): string => {
  const now = new Date();
  const timeDifference = now.getTime() - createdAt.getTime();

  const intervals = [
    { unit: "year", divisor: 31536000000 },
    { unit: "month", divisor: 2592000000 },
    { unit: "week", divisor: 604800000 },
    { unit: "day", divisor: 86400000 },
    { unit: "hour", divisor: 3600000 },
    { unit: "minute", divisor: 60000 },
    { unit: "second", divisor: 1000 }
  ];

  for (const interval of intervals) {
    if (timeDifference >= interval.divisor) {
      const count = Math.floor(timeDifference / interval.divisor);
      return `${count} ${
        count === 1 ? interval.unit : interval.unit + "s"
      } ago`;
    }
  }

  return "just now";
};

export const formatAndDivideNumber = (num: number): string => {
  if (num >= 1000000) {
    const formattedNum = (num / 1000000).toFixed(1);
    return `${formattedNum}M`;
  } else if (num >= 1000) {
    const formattedNum = (num / 1000).toFixed(1);
    return `${formattedNum}K`;
  } else {
    return num.toString();
  }
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export const formUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
};

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export const removeKeysFromQuery = ({
  params,
  keysToRemove
}: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl
    },
    { skipNull: true }
  );
};
