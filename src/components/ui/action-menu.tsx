import { useState, useEffect, useCallback, type ReactNode } from "react";
import { createPortal } from "react-dom";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
} from "@floating-ui/react-dom";

export interface ActionMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  danger?: boolean;
}

interface ActionMenuProps {
  items: ActionMenuItem[];
  className?: string;
}

export default function ActionMenu({ items, className }: ActionMenuProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles } = useFloating({
    open,
    placement: "bottom-end",
    middleware: [
      offset(4),
      flip({ padding: 8, fallbackPlacements: ["top-end", "bottom-start", "top-start"] }),
      shift({ padding: 8 }),
    ],
    whileElementsMounted: autoUpdate,
    strategy: "fixed",
  });

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const referenceEl = refs.reference.current;
      const floatingEl = refs.floating.current;
      if (
        (referenceEl instanceof Node && referenceEl.contains(target)) ||
        (floatingEl instanceof Node && floatingEl.contains(target))
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, refs.reference, refs.floating]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  const handleItemClick = useCallback(
    (onClick: () => void) => {
      onClick();
      setOpen(false);
    },
    [],
  );

  return (
    <>
      <button
        ref={refs.setReference}
        type="button"
        aria-label="Actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`text-gray-500 dark:text-slate-400 hover:text-accent-600 dark:hover:text-accent-400 cursor-pointer font-medium ${className ?? ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.5"
            d="M12 5.92A.96.96 0 1 0 12 4a.96.96 0 0 0 0 1.92m0 7.04a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92M12 20a.96.96 0 1 0 0-1.92a.96.96 0 0 0 0 1.92"
          />
        </svg>
      </button>

      {open &&
        createPortal(
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            role="menu"
            className="z-[99999] min-w-[184px] overflow-hidden rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-950 shadow-xl py-1.5 outline-none"
          >
            {items.map((item, i) => (
              <button
                key={i}
                type="button"
                role="menuitem"
                onClick={() => handleItemClick(item.onClick)}
                className={`group flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 cursor-pointer ${
                  item.danger
                    ? "text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30 dark:hover:text-red-400"
                    : "text-gray-700 dark:text-slate-200 hover:bg-accent-100/70 hover:text-accent-700 dark:hover:bg-accent-900/30 dark:hover:text-accent-300"
                }`}
              >
                {item.icon && (
                  <span className={`shrink-0 w-4 h-4 flex items-center justify-center transition-colors ${
                    item.danger
                      ? "text-red-600 group-hover:text-red-700 dark:group-hover:text-red-400"
                      : "text-gray-400 group-hover:text-accent-600 dark:text-slate-500 dark:group-hover:text-accent-400"
                  }`}>
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}

