import { MessageEnum } from '@/common/enums';
import { MessageType } from '@/common/types';
import styled, { css } from 'styled-components';

interface ModalBoxProps {
  isVisible: boolean;
}

interface JustificationProps {
  justification: string;
}

export const ModalBox = styled.div<ModalBoxProps>`
  position: absolute;
  bottom: 100%;
  margin-bottom: 2px;
  right: 3 %;
  background-color: white;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9; /* light gray border color */
  border-radius: 10px;
  margin-top: 0;
  width: 80;
  height: 100 %;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 2;
  color: black;
  opacity: ${props =>
    props.isVisible ? 1 : 0} !important; /* Show/hide the modal box */
  visibility: ${props =>
    props.isVisible ? 'visible' : 'hidden'}; /* Show/hide the modal box */
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.2); /* Add a pretty shadow */
  transition: ${props =>
    props.isVisible
      ? 'all 0.3s ease-in-out'
      : 'none'}; /* Add a transition effect or none */
`;

export const ModalElement = styled.div`
  display: flex;
  height: 100%;
  flex: 1;

  padding-left: 10px;
  padding: 8px 12px;
  justify-content: space-between;
  transition: background-color 0.3s ease;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: 1px;
    width: 100%;
    background-color: #d9d9d9; /* light gray color */
  }

  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
  }
`;

export const ChatBoxExternalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const ChatBoxInternalContainer = styled.div`
  position: relative;
  background-color: ${props => props.theme.CHATBOX_INTERNAL_BG};
  box-sizing: border-box;
  height: 100%;
  min-height: 200px;
  width: 100%;
`;

export const ChatBoxParticipantsBox = styled.div`
  visibility: hidden;
  position: absolute;
  right: 3%;
  background-color: ${props => props.theme.CHATBOX_PARTICIPANTSBOX_BG};
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.CHATBOX_PARTICIPANTSBOX_BORDER};
  border-radius: 10px;
  margin-top: 0px;
  padding: 10px 20px;
  width: 180px;
  height: 35%;
  max-height: 300px;
  display: flex;
  flex-direction: column;
  z-index: 1;
  overflow: auto;
  opacity: 0;
  color: ${props => props.theme.CHATBOX_PARTICIPANTS_TEXT};
  transition: visibility 0.3s linear, opacity 0.2s linear;
  &:hover: {
    visibility: visible;
  }
`;

export const ChatBoxParticipants = styled.div`
  display: block;
  font-size: 0.9rem;
  padding: 10px 20px;
  text-align: right;
  color: ${props => props.theme.CHATBOX_PARTICIPANTS_TEXT};
  &:hover ${ChatBoxParticipantsBox} {
    visibility: visible;
    opacity: 1;
    transition: visibility 0.3s linear, opacity 0.2s linear;
  }
`;

export const Participant = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 0px;
`;

export const ChatBoxInputGroup = styled.div`
  background-color: ${props => props.theme.CHATBOX_INPUTGROUP_BG};
  border-top: 0.7px solid ${props => props.theme.CHATBOX_INPUTGROUP_BORDER_TOP};
  display: flex;
  width: 100%;
  min-height: 60px;
  justify-content: center;
  padding: 8px 12px;
  box-sizing: border-box;

  & textarea {
    background-color: inherit;
    border: none;
    color: ${props => props.theme.CHATBOX_INPUTGROUP_TEXTAREA};
    flex-grow: 1;
    font-size: 16px;
    font-weight: bold;
    font-family: 'NanumGothic';
    height: 100%;
    outline: 0;
    resize: none;
  }

  & button {
    background-color: inherit;
    border: none;
    color: ${props => props.theme.CHATBOX_INPUTGROUP_BTN};
    font-size: 15px;
    font-weight: bold;
    min-width: 80px;

    &:focus {
      outline: 0;
    }

    &:hover {
      filter: brightness(0.98);
      transition: filter 0.2s linear;
    }
  }
`;

export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${(props: JustificationProps) =>
    props.justification === 'around'
      ? 'space-around'
      : `flex-${props.justification}`};
  margin-top: ${(props: JustificationProps) =>
    props.justification === 'around'
      ? '20px'
      : props.justification === 'start'
      ? '35px'
      : '10px'};
  ${props => props.justification === 'around' && `font-weight: bold`};
  position: relative;
  max-width: 100%;
  opacity: 1;
  -webkit-animation: bound 1s linear;

  @keyframes bound {
    0% {
      bottom: 220px;
    }
    30% {
      bottom: 0px;
    }
    45% {
      bottom: 40px;
    }
    55% {
      bottom: 70px;
    }
    70% {
      bottom: 0px;
    }
    85% {
      bottom: 20px;
    }
    100% {
      bottom: 0px;
    }
  }
`;

export const MessageUsername = styled.span`
  bottom: calc(100% + 8px);
  font-size: 14px;
  font-weight: bold;
  position: absolute;
  color: ${props => props.theme.MSG_USERNAME};
`;

export const MessageContent = styled.div<{
  isModalOn: boolean;
  username: string;
  message: MessageType;
}>`
  background-color: ${props =>
    props.message.type === MessageEnum.VOTESTART ||
    props.message.type === MessageEnum.VOTEEND
      ? props.theme.MSG_CONTENT_USER_BACK
      : props.message.username && props.message.username !== props.username
      ? props.theme.MSG_CONTENT_AWAY_BACK
      : props.message.type === MessageEnum.DELETED
      ? props.theme.MSG_DELETED
      : props.theme
          .MSG_CONTENT_USER_BACK}; //109, 110 번째 줄과의 통일 성을 위해서 수정
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 14px;
  max-width: 90%;
  padding: 10px 15px;
  position: relative;
  word-break: break-word;
  white-space: pre-wrap;
  opacity: ${props => (props.isModalOn ? 0.4 : 1)};
  transition: opacity 0.2s ease-in-out;
  color: ${props =>
    props.username
      ? props.theme.MSG_CONTENT_AWAY_TEXT
      : props.theme.MSG_CONTENT_USER_TEXT};
`;

export const MessageDelete = styled.button`
  position: relative;
  font-size: 6px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export const MessageDate = styled.div`
  position: absolute;
  display: flex;
  bottom: 5%;
  flex-direction: column;

  ${(props: JustificationProps) =>
    props.justification === 'start'
      ? `
        left: calc(100% + 8px);
        align-items: flex-start;
      `
      : `
        right: calc(100% + 8px); 
        align-items: flex-end;
      `}

  & > span {
    font-size: 0.6rem;
    white-space: nowrap;
  }
`;

export const ChatBoxScrollable = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column-reverse;
  height: calc(100% - 50px);
  overflow: auto;
  padding: 0px 40px;
`;

export const ChatBroadcast = styled.div<{ visible: boolean }>`
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
  opacity: ${props => (props.visible ? '1' : '0')};
  display: flex;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  background-color: ${props => props.theme.CHATBOX_BROADCAST_BG};
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  color: ${props => props.theme.CHATBOX_BROADCAST_TEXT};
  max-width: 90%;
  padding: 7px 20px;
  word-break: break-word;
  transition: visibility 0.4s linear, opacity 0.3s linear;
  z-index: 1;
`;

export const ChatURL = styled.a`
  text-decoration: None;
  color: ${props => props.theme.CHATBOX_URL};
  font-style: italic;
`;

export const ChatContextMenu = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${({ top }) => top}px;
  left: ${({ left }) => left})px;
`;
