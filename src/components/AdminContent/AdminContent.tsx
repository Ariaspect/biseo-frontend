import React from 'react';
import { useForm } from 'react-hook-form';
import BiseoButton from '@/components/BiseoButton';
import { Agenda } from '@/common/types';
import { AgendaStatus } from '@/common/enums';
import {
  AdminContentContainer,
  ButtonGroup,
  ContentTextArea,
  SubtitleInput,
  TitleInput,
} from './styled';

interface AdminContentCreateProps {
  choices: string[];
  extendable: boolean;
  onVoteCreate: (
    title: string,
    content: string,
    subtitle: string,
    choices: string[]
  ) => void;
}

interface AdminContentEditProps {
  agenda: Agenda;
  extendable: boolean;
  onVoteEdit?: (
    _id: string,
    title: string,
    content: string,
    subtitle: string,
    choices: string[]
  ) => void;
  onVoteDelete?: (_id: string) => void;
  exitEditMode?: (_id: string) => void;
}

interface FormInputs {
  title: string;
  content: string;
  subtitle: string;
}

export const AdminContentCreate: React.FC<AdminContentCreateProps> = ({
  choices,
  extendable,
  onVoteCreate,
}) => {
  const { register, handleSubmit, errors, reset } = useForm<FormInputs>();
  const onSubmit = ({ title, content, subtitle }: FormInputs) => {
    if (choices.length < 1) return;
    onVoteCreate(title, content, subtitle, choices);
    reset();
  };

  return (
    <AdminContentContainer onSubmit={handleSubmit(onSubmit)}>
      <TitleInput
        name="title"
        placeholder="투표 제목을 입력하세요"
        className={errors.title && 'error'}
        ref={register({ required: true })}
      />
      <ContentTextArea
        name="content"
        placeholder="투표 내용을 입력하세요"
        className={errors.content && 'error'}
        ref={register({ required: true })}
      />
      <SubtitleInput
        name="subtitle"
        placeholder="의결문안을 입력하세요"
        className={errors.subtitle && 'error'}
        ref={register({ required: true })}
      />
      <ButtonGroup>
        {choices.map(choice => (
          // a button's default type is 'submit', but we don't want this button to submit
          <BiseoButton type="button" nocursor key={choice}>
            {choice}
          </BiseoButton>
        ))}
        {extendable && <BiseoButton>+</BiseoButton>}
      </ButtonGroup>
      <ButtonGroup alignRight={true}>
        <BiseoButton type="submit" background="#f2a024" foreground="#ffffff">
          만들기
        </BiseoButton>
      </ButtonGroup>
    </AdminContentContainer>
  );
};

export const AdminContentEdit: React.FC<AdminContentEditProps> = ({
  agenda,
  extendable,
  onVoteEdit,
  onVoteDelete,
  exitEditMode,
}) => {
  const { _id, title, content, subtitle, choices, expires, status } = agenda;

  const { register, handleSubmit, errors, reset } = useForm<FormInputs>({
    defaultValues: {
      title: title,
      content: content,
      subtitle: subtitle,
    },
  });

  const onSubmit = ({ title, content, subtitle }: FormInputs) => {
    if (choices.length < 1) return;
    onVoteEdit(_id, title, content, subtitle, choices);
    reset();
  };

  const active = Date.now() < Date.parse(expires);

  return (
    <AdminContentContainer onSubmit={handleSubmit(onSubmit)}>
      <TitleInput
        name="title"
        placeholder="투표 제목을 입력하세요"
        className={errors.title && 'error'}
        ref={register({ required: true })}
      />
      <ContentTextArea
        name="content"
        placeholder="투표 내용을 입력하세요"
        className={errors.content && 'error'}
        ref={register({ required: true })}
      />
      <SubtitleInput
        name="subtitle"
        placeholder="의결문안을 입력하세요"
        className={errors.subtitle && 'error'}
        ref={register({ required: true })}
      />
      <ButtonGroup>
        {choices.map(choice => (
          // a button's default type is 'submit', but we don't want this button to submit
          <BiseoButton type="button" nocursor key={choice}>
            {choice}
          </BiseoButton>
        ))}
        {extendable && <BiseoButton>+</BiseoButton>}
      </ButtonGroup>
      <ButtonGroup alignRight={true}>
        <BiseoButton
          type="submit"
          background="#f2a024"
          foreground="#ffffff"
          disabled={!(active && status === AgendaStatus.PREPARE)}
        >
          수정
        </BiseoButton>
        <BiseoButton
          type="button"
          background="#f2a024"
          foreground="#ffffff"
          onClick={() => {
            onVoteDelete(_id);
          }}
          disabled={active && status === AgendaStatus.PROGRESS}
        >
          삭제
        </BiseoButton>
        <BiseoButton
          type="button"
          onClick={() => {
            exitEditMode(_id);
          }}
        >
          취소
        </BiseoButton>
      </ButtonGroup>
    </AdminContentContainer>
  );
};
