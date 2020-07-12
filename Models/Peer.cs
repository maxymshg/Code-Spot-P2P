namespace CodeSpotP2P.Model
{
    public class Peer
    {
        public int Id { get; set; }
        public string PeerId { get; set; }
        public string RoomName { get; set; }
        public int HasReceivedAllMessages { get; set;} // 0 or 1
        public Room Room { get; set; }
        public Peer(string peerId, string roomName, int hasReceivedAllMessages)
        {
            PeerId = peerId;
            RoomName = roomName;
            this.HasReceivedAllMessages = hasReceivedAllMessages;
        }

        public Peer() {}
    }
}