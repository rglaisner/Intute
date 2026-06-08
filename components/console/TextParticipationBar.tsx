/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { FormEvent, useState } from 'react';
import { useLiveAPIContext } from '../../contexts/LiveAPIContext';
import { useParticipationStore, useUI } from '../../lib/state';

/**
 * Text input bar shown when the user participates via typing instead of voice.
 */
export default function TextParticipationBar() {
  const { connected, isConnecting } = useLiveAPIContext();
  const { participationMode } = useUI();
  const { sendUserText } = useParticipationStore();
  const [message, setMessage] = useState('');

  if (!connected || isConnecting || participationMode !== 'text') {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      return;
    }
    sendUserText(trimmed);
    setMessage('');
  };

  return (
    <form
      className="text-participation-bar"
      onSubmit={handleSubmit}
      data-testid="text-participation-bar"
    >
      <input
        type="text"
        className="text-participation-input"
        value={message}
        onChange={event => setMessage(event.target.value)}
        placeholder="Type your message..."
        aria-label="Type your message to the teacher"
        data-testid="text-participation-input"
      />
      <button
        type="submit"
        className="text-participation-send"
        disabled={!message.trim()}
        aria-label="Send message"
        data-testid="text-participation-send"
      >
        <span className="material-symbols-outlined filled">send</span>
      </button>
    </form>
  );
}
