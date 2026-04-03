import { useAppStore } from '@/store';
import './RemoteVideos.css';

interface RemoteVideosProps {
  useInviteStore?: boolean;
}

export default function RemoteVideos({ useInviteStore = false }: RemoteVideosProps) {
  const remoteUsers = useAppStore((state) => useInviteStore ? state.inviteRemoteUsers : state.remoteUsers);

  if (remoteUsers.length === 0) return null;

  return (
    <div className="remote-videos-container">
      {remoteUsers.map((user) => (
        <div key={user.elementId} id={user.elementId} className="remote-video" />
      ))}
    </div>
  );
}
