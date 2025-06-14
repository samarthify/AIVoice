import { io } from 'socket.io-client';
export class VoiceClient {
    private targetUserId!: string;
    private peerConnection: RTCPeerConnection;
    private socket: any;
    private localStream: MediaStream | null = null;
    
    constructor(socketUrl: string) {
      this.peerConnection = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' }
        ]
      });
      
      this.socket = io(socketUrl);
      this.setupEventHandlers();
    }
    
    private setupEventHandlers() {
      this.socket.on('offer', this.handleOffer.bind(this));
      this.socket.on('answer', this.handleAnswer.bind(this));
      this.socket.on('ice-candidate', this.handleIceCandidate.bind(this));
      
      this.peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.socket.emit('ice-candidate', {
            candidate: event.candidate,
            target: this.targetUserId
          });
        }
      };
      
      this.peerConnection.ontrack = (event) => {
        const remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement;
        if (remoteAudio) {
          remoteAudio.srcObject = event.streams[0];
        }
      };
    }
    
    async startCall(targetUserId: string) {
      this.targetUserId = targetUserId;
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream!);
      });
      
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      
      this.socket.emit('offer', {
        sdp: offer,
        target: targetUserId
      });
    }
    
    private async handleOffer(data: any) {
      await this.peerConnection.setRemoteDescription(data.sdp);
      
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream!);
      });
      
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      
      this.socket.emit('answer', {
        sdp: answer,
        target: data.sender
      });
    }
    
    private async handleAnswer(data: any) {
      await this.peerConnection.setRemoteDescription(data.sdp);
    }
    
    private async handleIceCandidate(data: any) {
      await this.peerConnection.addIceCandidate(data.candidate);
    }
  }
  