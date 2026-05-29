import { useEffect, useState } from "react";

/** Matches mobile layout breakpoint in App.css */
export const MOBILE_MEDIA_QUERY = "(max-width: 720px)";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(MOBILE_MEDIA_QUERY).matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
