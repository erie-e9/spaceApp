import React from 'react';
import styled from 'styled-components';
import {variables} from '@utils/constants';

const TouchableOpacity = styled.TouchableOpacity`
  height: 40px;
`;
const AvatarContainer = styled.View``;
const Avatar = styled.Image``;

const ETAAvatar = ({avatar, size}) => {
  const avatarSizeMiddle = 50;
  const avatarSizeSmall = 30;

  return (
    <>
      <TouchableOpacity
        style={{
          height: size === 'middle' ? avatarSizeMiddle : avatarSizeSmall,
          width: size === 'middle' ? avatarSizeMiddle : avatarSizeSmall,
        }}>
        <AvatarContainer>
          <Avatar
            style={{
              height: size === 'middle' ? avatarSizeMiddle : avatarSizeSmall,
              width: size === 'middle' ? avatarSizeMiddle : avatarSizeSmall,
              borderRadius:
                size === 'middle' ? avatarSizeMiddle / 2 : avatarSizeSmall / 2,
            }}
            source={{uri: avatar ? avatar : variables.AVATAR_USER_DEFAULT}}
          />
        </AvatarContainer>
      </TouchableOpacity>
    </>
  );
};

export default ETAAvatar;
