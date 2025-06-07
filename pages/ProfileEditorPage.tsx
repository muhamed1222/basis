import React from 'react';
import StandardPageLayout from '../layouts/StandardPageLayout';
import { ProfileEditor } from '../components/ProfileEditor';

const ProfileEditorPage: React.FC = () => {
  // In real app user id should come from auth context
  const userId = 'user1';
  return (
    <StandardPageLayout title="Редактирование профиля">
      <ProfileEditor userId={userId} />
    </StandardPageLayout>
  );
};

export default ProfileEditorPage;
