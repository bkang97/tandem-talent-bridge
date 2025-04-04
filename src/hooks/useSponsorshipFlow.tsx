
import { useState } from 'react';

/**
 * Custom hook to manage the flow between sponsorship and reservation modals
 * This ensures consistent behavior across all components that need this flow
 */
export const useSponsorshipFlow = () => {
  const [showSponsorshipModal, setShowSponsorshipModal] = useState(false);
  const [showReservationModal, setShowReservationModal] = useState(false);

  const openSponsorshipModal = () => {
    setShowSponsorshipModal(true);
    setShowReservationModal(false);
  };

  const closeSponsorshipModal = () => {
    setShowSponsorshipModal(false);
  };

  const handleScheduleConsultation = () => {
    setShowSponsorshipModal(false);
    setShowReservationModal(true);
  };

  const closeReservationModal = () => {
    setShowReservationModal(false);
  };

  return {
    showSponsorshipModal,
    showReservationModal,
    openSponsorshipModal,
    closeSponsorshipModal,
    handleScheduleConsultation,
    closeReservationModal
  };
};
