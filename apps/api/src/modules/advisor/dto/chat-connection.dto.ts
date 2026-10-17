/**
 * @file apps/api/src/modules/advisor/dto/chat-connection.dto.ts
 * @description Relay-compliant ChatMessageConnection for cursor-based chat history pagination.
 * @module @vitalai/api/advisor
 */

import { ObjectType } from "@nestjs/graphql";
import { createConnection } from "../../../common/pagination/connection.factory";
import { ChatMessageResponse } from "./chat-message.dto";

export const ChatMessageConnectionBase = createConnection(ChatMessageResponse, "ChatMessage");

@ObjectType({ description: "Relay cursor connection for consultation chat messages" })
export class ChatMessageConnection extends ChatMessageConnectionBase {}
