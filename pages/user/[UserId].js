// pages/user/[userId].js
import { useEffect, useState } from 'react';
import { dbConnect } from '../../lib/db';
import User from '../../models/User';
import { useRouter } from 'next/router';

const UserProfile = ({ user }) => {
  const router = useRouter();
  const { userId } = router.query;
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${userId}`);
        const fetchedUserData = await response.json();
        setUserData(fetchedUserData);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Information</h2>
      <p>User ID: {userData.userId}</p>
      <p>Username: {userData.username}</p>
      <p>Profile Picture: {userData.profilePicture}</p>
      <p>Wallet Address: {userData.walletAddress}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  await dbConnect();

  const { userId } = context.params;

  try {
    const user = await User.findOne({ userId });

    if (user) {
      return {
        props: {
          user: JSON.parse(JSON.stringify(user)),
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return {
      notFound: true,
    };
  }
}

export default UserProfile;
