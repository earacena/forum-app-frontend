import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { GrAdd } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { FormInput, FormLabel, FormSubmitButton } from '../../components';
import { notify } from '../Notification';
import forumService from '../../services/forumService';
import type { TopicItem } from '../../types';

const ForumBuilderWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: '';
  width: 80%;
  min-width: 300px;
  max-width: 800px;
`;

const ForumBuilderHeader = styled.h2`
  font-size: 30px;
  color: ${(props) => props.theme.fg};
`;

const AddTopicButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colorAccent};
  font-size: 20px;
  padding: 10px;
  border: none;
  border-radius: 50%;

  &:hover {
    transform: translate(0, -2px);
  }

  &:active {
    transform: translate(0, 1px);
  }
`;

const SectionTitle = styled.div`
  color: ${(props) => props.theme.fg};
  font-size: 25px;
  margin-left: 10px;
`;

const FormField = styled.span`
  display: flex;
  flex-direction: column;
`;

const TopicFieldsListItem = styled.div`
  display: flex;
  width: 100%;
  
  border-bottom: 1px rgba(255, 255, 255, 0.1) solid;
  margin-bottom: 10px;
  padding-bottom: 10px;
  
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
  &:last-child {
    border-bottom: none;
  }
`;

const TopicFieldsListWrapper = styled.ul`
  padding: 0;
  width: 100%;
`;

function ForumBuilderForm() {
  const auth = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const [forumName, setForumName] = useState<string>('');
  const [topicFields, setTopicFields] = useState<TopicItem[]>([]);
  const isUserLoggedIn = auth.token !== '';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      const newForum = await forumService.create({
        token: auth.token,
        forumTitle: forumName,
        forumTopics: topicFields,
      });

      navigate(`/forum/${newForum.id}`);
    } catch (error: unknown) {
      notify('error', 'Error processing given forum details.', 4);
    }
  };

  const handleForumNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForumName(event.target.value);
  };

  const handleFormChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const prevTopicFields = [...topicFields];
    prevTopicFields[index][event.target.name] = event.target.value;
    setTopicFields(prevTopicFields);
  };

  const handleAddTopic = () => {
    setTopicFields((prevTopicFields) => [...prevTopicFields, { topicId: topicFields.length + 1, topicName: '', topicDescription: '' }]);
  };

  useEffect(() => {
    // If user is not logged in, redirect use to login
    if (!auth.token) {
      navigate('/login');
    }
  }, [navigate, auth.token]);

  return (
    <ForumBuilderWrapper
      style={{ visibility: isUserLoggedIn ? 'visible' : 'hidden' }}
      onSubmit={handleSubmit}
    >
      <ForumBuilderHeader>Forum Builder</ForumBuilderHeader>

      <SectionTitle>Forum Details</SectionTitle>
      <FormLabel htmlFor="forumName">Forum Name</FormLabel>
      <FormInput id="forumName" value={forumName} onChange={handleForumNameChange} />

      <SectionTitle>Topics</SectionTitle>
      <TopicFieldsListWrapper>
        {
          topicFields.map((topic, index) => (
            <TopicFieldsListItem
              key={topic.topicId}
            >
              <FormField>
                <FormLabel htmlFor={`topicName-${topic.topicId}`}>Topic Name</FormLabel>
                <FormInput
                  id={`topicName-${topic.topicId}`}
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

      <FormSubmitButton style={{ margin: '30px', marginLeft: 0 }}>Create</FormSubmitButton>
    </ForumBuilderWrapper>
  );
}

export default ForumBuilderForm;
