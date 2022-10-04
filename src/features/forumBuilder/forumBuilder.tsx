import React, { useState } from 'react';
import styled from 'styled-components';
import { GrAdd } from 'react-icons/gr';

const ForumBuilderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ForumBuilderHeader = styled.h2`
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

function ForumBuilder() {
  const topics = useState<string[]>([]);

  return (
    <ForumBuilderWrapper>
      <ForumBuilderHeader>Add the topics you would like to see in the forum.</ForumBuilderHeader>
      {!topics && <span>Use the button below to add a topic.</span>}
      <AddTopicButton onClick={handleClick}>
        <GrAdd />
      </AddTopicButton>
    </ForumBuilderWrapper>
  );
}

export default ForumBuilder;
