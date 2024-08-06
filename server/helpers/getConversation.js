const { ConversationModel } = require("../models/ConversationModel");

const getConversation = async (currentUserId) => {
  if (currentUserId) {
    const currentUserConverSation = await ConversationModel.find({
      $or: [{ sender: currentUserId }, { receiver: currentUserId }],
    })
      .sort({ updatedAt: -1 })
      .populate("messages")
      .populate("sender")
      .populate("receiver");

    const conversation = currentUserConverSation.map((conv) => {
      const countUnSeenMsg = conv?.messages.reduce((prev, curr) => {
        const msgByUserId = curr?.msgByUserId?.toString();
        if (msgByUserId !== currentUserId) {
          return prev + (curr.seen ? 0 : 1);
        } else return prev;
      }, 0);
      return {
        _id: conv?._id,
        receiver: conv?.receiver,
        sender: conv?.sender,
        unSeenMsg: countUnSeenMsg,
        lastMsg: conv?.messages[conv?.messages?.length - 1],
      };
    });
    return conversation;
  } else {
    return [];
  }
};
module.exports = getConversation;
