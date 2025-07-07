import React from 'react';
import VoiceChat from '../components/VoiceChat';

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Voice Communication Platform</h1>
      <VoiceChat currentUserId="1" />
    </main>
  );
}
