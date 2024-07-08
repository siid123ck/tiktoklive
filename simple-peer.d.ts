declare module 'simple-peer' {
    import { EventEmitter } from 'events';
  
    interface Options {
      initiator?: boolean;
      trickle?: boolean;
      stream?: MediaStream;
      config?: any;
      channelConfig?: any;
      offerOptions?: any;
      answerOptions?: any;
      sdpTransform?: (sdp: string) => string;
      streams?: MediaStream[];
      wrtc?: any;
      objectMode?: boolean;
    }
  
    interface SignalData {
      type: 'offer' | 'pranswer' | 'answer' | 'rollback' | 'renegotiate' | 'transceiverRequest' | 'iceUpdate';
      sdp?: string;
      candidate?: RTCIceCandidate;
      sdpMid?: string;
      sdpMLineIndex?: number;
      renegotiate?: boolean;
      transceiverRequest?: any;
    }
  
    class Peer extends EventEmitter {
      constructor(opts?: Options);
      signal(data: SignalData): void;
      destroy(err?: Error): void;
      send(data: any): void;
      addStream(stream: MediaStream): void;
      addTrack(track: MediaStreamTrack, stream: MediaStream): void;
      replaceTrack(oldTrack: MediaStreamTrack, newTrack: MediaStreamTrack, stream: MediaStream): void;
      removeTrack(track: MediaStreamTrack, stream: MediaStream): void;
      removeStream(stream: MediaStream): void;
      readonly connected: boolean;
      readonly destroyed: boolean;
    }
  
    export = Peer;
  }
  