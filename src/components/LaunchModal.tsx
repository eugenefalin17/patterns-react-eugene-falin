 
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Launch } from '../types/launch';

type LaunchModalProps = {
  launch: Launch;
  onClose: () => void;
};

export const LaunchModal = ({ launch, onClose }: LaunchModalProps) => {
     
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
   <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>

        {launch.links?.mission_patch && (
          <img
            className="modal-image"
            src={launch.links.mission_patch}
            alt={launch.mission_name}
          />
        )}

        <p>
  <strong>Mission name:</strong>
  <br />
  {launch.mission_name}
</p>

        <p>
          <strong>Rocket name:</strong>
          <br />
          {launch.rocket?.rocket_name}
        </p>

        <p>
          <strong>Details:</strong>
          <br />
          {launch.details || 'No details available.'}
        </p>
      </div>
    </div>,
    document.body
  );
};
