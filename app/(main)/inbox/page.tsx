"use client";
import CreateMessage from "../../components/message/create";
import DropDown from "../../components/message/dropdown";
import AccountMessage from "../../components/message/accountMessage";
import React, { useEffect, useState } from "react";
import ChatBox from "./chatBox";
import { useSearchParams } from "next/navigation";
import { OtherUserProfile } from "@/utils/Interfaces";
import { useUserContext } from "@/app/components/context/userContext";

interface conversations {
  username: string;
  profile_img: URL;
  last_message: string;
}

function Messages() {
  const searchParams = useSearchParams();
  const id_user = searchParams.get("id_user");

  // context
  const { user } = useUserContext();

  const [profile, setProfile] = useState<OtherUserProfile | undefined>();
  const [conversations, setConversations] = useState<conversations[] | []>([]);
  const [selectedChat, setSelectedChat] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      const Response = await fetch(`/api/accounts/get_profile/${id_user}/`);
      let data = await Response.json();
      if (data.status) setProfile(data.profile);
    }
    if (id_user) fetchProfile();
  }, [id_user]);

  useEffect(() => {
    if (profile) {
      setConversations([
        {
          username: profile.username,
          profile_img: profile.profile_img,
          last_message: "",
        },
      ]);
    }
    if ((!profile && !id_user) || profile) {
      fetch("/api/chat/conversations/").then((response) => {
        response.json().then((response) => {
          let temp_conversations: conversations[] = response.conversations;
          let found_index = temp_conversations.findIndex(
            (conversation) => conversation.username === profile?.username
          );
          if (found_index !== -1) {
            let found_conversation = temp_conversations[found_index];
            temp_conversations.splice(found_index, 1);
            setConversations([found_conversation, ...temp_conversations]);
          } else {
            setConversations((prevConversation) => [
              ...prevConversation,
              ...temp_conversations,
            ]);
          }
          setSelectedChat(
            profile?.username || response.conversations[0]?.username
          );
        });
      });
    }
  }, [profile]);

  return (
    <div className="flex w-full justify-center bg-_grey p-5">
      <div className="flex w-3/5 rounded border border-border_grey bg-black">
        <div className="w-2/5 border-r border-border_grey">
          {/* top */}
          <div className="flex w-full border-b border-border_grey">
            <div className="w-1/6"></div>
            <div className="flex w-4/6 justify-center gap-1 p-4 font-bold">
              <span>{user?.username}</span>
              <DropDown className="" stroke="white" />
            </div>
            <div className="flex w-1/6 items-center">
              <CreateMessage stroke="white" className="cursor-pointer" />
            </div>
          </div>
          {/* users */}
          {conversations.map((user) => (
            <AccountMessage
              username={user.username}
              profile_img={user.profile_img}
              last_message={user.last_message}
              setSelectChat={setSelectedChat}
              width={60}
              height={60}
              key={user.username}
            />
          ))}
        </div>

        <div className="w-3/5">
          {selectedChat ? (
            <ChatBox recipient={selectedChat} selectedChat={selectedChat} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Messages;
