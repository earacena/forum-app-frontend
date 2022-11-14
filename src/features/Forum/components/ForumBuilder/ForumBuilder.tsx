import React, { useState, useEffect, useContext } from 'react';
import { GrAdd } from 'react-icons/gr';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { useAppSelector } from '../../../../hooks';
import {
  FormInput,
  FormLabel,
  FormSubmitButton,
  Spin,
} from '../../../../components';
import { notify } from '../../../Notification';
import forumService from '../../../../services/forumService';
import type { TopicItem } from '../../../../types';
import {
  ForumBuilderWrapper,
  ForumBuilderHeader,
  SectionTitle,
  TopicFieldsListItem,
  TopicFieldsListWrapper,
  FormField,
  AddTopicButton,
} from './styles/forumBuilder.styles';

function ForumBuilderForm() {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const auth = useAppSelector((state) => state.auth);
  const [forumTitle, setForumTitle] = useState<string>('');
  const [topicFields, setTopicFields] = useState<TopicItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const isUserLoggedIn = auth.user?.token !== '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Ignore empty submissions
    if (forumTitle === '' || topicFields.length === 0) {
      return;
    }

    try {
      setIsSubmitting(true);

      const newForum = await forumService.create({
        token: auth.user?.token,
        forumTitle,
        forumTopics: topicFields,
      });

      navigate(`/forum/${newForum.id}`);
    } catch (error: unknown) {
      notify('error', 'Error processing given forum details.', 4);
      setIsSubmitting(false);
    }
  };

  const handleForumNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForumTitle(event.target.value);
  };

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const prevTopicFields = [...topicFields];
    prevTopicFields[index][event.target.name] = event.target.value;
    setTopicFields(prevTopicFields);
  };

  const handleAddTopic = () => {
    setTopicFields((prevTopicFields) => [
      ...prevTopicFields,
      { topicId: topicFields.length + 1, topicTitle: '', topicDescription: '' },
    ]);
  };

  useEffect(() => {
    // If user is not logged in, redirect use to login
    if (!auth.user?.token) {
      navigate('/login');
    }
  }, [navigate, auth.user?.token]);

  return (
    <ForumBuilderWrapper
      style={{ visibility: isUserLoggedIn ? 'visible' : 'hidden' }}
      onSubmit={handleSubmit}
    >
      <ForumBuilderHeader>Forum Builder</ForumBuilderHeader>

      <SectionTitle>Forum Details</SectionTitle>
      <FormLabel htmlFor="forumTitle">Forum Title</FormLabel>
      <FormInput id="forumTitle" value={forumTitle} onChange={handleForumNameChange} />

      <SectionTitle>Topics</SectionTitle>
      <TopicFieldsListWrapper>
        {
          topicFields.map((topic, index) => (
            <TopicFieldsListItem
              key={topic.topicId}
            >
              <FormField>
                <FormLabel htmlFor={`topicTitle-${topic.topicId}`}>Topic Name</FormLabel>
                <FormInput
                  id={`topicTitle-${topic.topicId}`}
                  name="topicTitle"
                  placeholder="General Discussions"
                  onChange={(event) => handleFormChange(index, event)}
                />
              </FormField>
              <FormField style={{ flex: 1 }}>
                <FormLabel htmlFor={`topicDescription-${topic.topicId}`}>Topic Description</FormLabel>
                <FormInput
                  id={`topicDescription-${topic.topicId}`}
                  name="topicDescription"
                  placeholder="Discussions about everything and anything."
                  onChange={(event) => handleFormChange(index, event)}
                />
              </FormField>
            </TopicFieldsListItem>
          ))
        }
      </TopicFieldsListWrapper>

      <AddTopicButton type="button" onClick={handleAddTopic}><GrAdd /></AddTopicButton>

      <FormSubmitButton
        style={{ margin: '30px', marginLeft: 0 }}
        disabled={isSubmitting}
      >
        {!isSubmitting ? 'Create' : <Spin><AiOutlineLoading3Quarters style={{ color: theme.bg, fontSize: '40px' }} /></Spin>}
      </FormSubmitButton>
    </ForumBuilderWrapper>
  );
}

export default ForumBuilderForm;
