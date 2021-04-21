import { useRouter } from "next/router";
import { useEffect } from "react";

export interface ModalProps {
  isOpen: boolean;
  onClose?: (event: any) => void;
}

export function Modal({ children, ...props }) {
  const router = useRouter();

  function closeModal(e) {
    if(e.target === e.currentTarget) router.push('/');
  }

  if (!props.isOpen) return null;

  return (
    <div onClick={(e) => closeModal(e)} id="other-modal">
      <div id="other-modal-container">
        {children}
      </div>
      <style jsx>{`
        div#other-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,.0125);
          z-index: 8;
          cursor: pointer;
        }
        div#other-modal-container {
          margin: 4rem;
          background: white;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          box-shadow: 0 0 4rem rgba(0,0,0,.125);
          border-radius: 2px;
          z-index: 9;
          cursor: auto;
        }

        div#other-modal-container {
          animation-duration: .2s;
          animation-name: drop;
          animation-timing-function: ease-out;
        }
        
        @keyframes drop {
          from {
            top: -1rem;
            bottom: 1rem;
            opacity: .5;
          }
        
          to {
            top: 0;
            bottom: 0;
            opacity: 1;
          }
        }
        
        @media (max-width: 414px) {
          div#other-modal-container {
            margin: 2rem;
          }
        }
        `}</style>
    </div>
  )
}