import clsx from "clsx";
import { type ComponentPropsWithoutRef, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { useLogger } from "@/hooks/useLogger";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  className?: ComponentPropsWithoutRef<"div">["className"];
};

export const Modal: FC<ModalProps> = (props) => {
  const { children, isOpen, className } = props;
  const logger = useLogger().logger;

  let modalRoot = document.getElementById("portal");
  if (modalRoot == null) {
    modalRoot = document.createElement("div");
    modalRoot.id = "portal";
    document.body.appendChild(modalRoot);
    logger.warn({ message: "modalRoot not found, created a new one" });
  }

  return isOpen
    ? createPortal(
        <div
          data-testid="overlay"
          className="fixed inset-0 flex flex-col items-center justify-center bg-black/50"
        >
          <div
            data-testid="modal"
            className={clsx("rounded bg-white shadow-lg", className)}
          >
            {children}
          </div>
        </div>,
        modalRoot,
      )
    : null;
};
