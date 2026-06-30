import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "@/firebase/firebase";

export interface Conversation {
  questionIndex: number;
  question: string;
  answer: string;
}

export const saveConversation = async (
  interviewId: string,
  conversation: Conversation,
) => {
  const transcriptRef = doc(
    db,
    "interviews",
    interviewId,
    "transcript",
    "content",
  );

  const snapshot = await getDoc(transcriptRef);

  const conversationData = {
    ...conversation,
    answeredAt: Timestamp.now(), // ✅ or new Date()
  };

  if (!snapshot.exists()) {
    await setDoc(transcriptRef, {
      conversations: [conversationData],

      updatedAt: serverTimestamp(),
    });

    return;
  }

  await updateDoc(transcriptRef, {
    conversations: arrayUnion(conversationData),

    updatedAt: serverTimestamp(),
  });
};
