import React, { useState, useEffect, useRef } from 'react';
import { Button, Card, Typography, TextField } from '@mui/material';
import { VoiceClient } from '../services/VoiceClient';

interface VoiceChatProps {
  currentUserId: string;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ currentUserId }) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [targetUser, setTargetUser] = useState('');
  const [callStatus, setCallStatus] = useState('idle');
  const voiceClientRef = useRef<VoiceClient | null>(null);
  
  useEffect(() => {
    voiceClientRef.current = new VoiceClient('http://localhost:3001');
    
    return () => {
      if (voiceClientRef.current) {
        voiceClientRef.current = null;
      }
    };
  }, []);
  
  const handleStartCall = async () => {
    if (!targetUser || !voiceClientRef.current) return;
    
    setCallStatus('connecting');
    await voiceClientRef.current.startCall(targetUser);
    setIsCallActive(true);
    setCallStatus('active');
  };
  
  const handleEndCall = () => {
    setIsCallActive(false);
    setCallStatus('idle');
    // Send end call signal
  };
  
  return (
    <Card className="p-6 max-w-md mx-auto">
      <Typography variant="h5" className="mb-4">
        Voice Chat
      </Typography>
      
      <div className="space-y-4">
        <TextField
          fullWidth
          label="User ID to Call"
          value={targetUser}
          onChange={(e) => setTargetUser(e.target.value)}
          disabled={isCallActive}
        />
        
        <div className="flex space-x-2">
          <Button
            variant="contained"
            color="primary"
            onClick={handleStartCall}
            disabled={isCallActive || !targetUser}
            className="flex-1"
          >
            {callStatus === 'connecting' ? 'Connecting...' : 'Start Call'}
          </Button>
          
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEndCall}
            disabled={!isCallActive}
            className="flex-1"
          >
            End Call
          </Button>
        </div>
        
        <div className="text-center">
          <Typography variant="body2" color="textSecondary">
            Status: {callStatus}
          </Typography>
        </div>
      </div>
      
      <audio id="remoteAudio" autoPlay />
    </Card>
  );
};

export default VoiceChat;
