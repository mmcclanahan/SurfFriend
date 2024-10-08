import { supabase } from "../connect.js";

export const getAllFriends = async () => {
  //get user id
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: "Error getting your user data" };
  }
  const userId = data.user.id;
  //get friends and the UserStatus for each user
  const response = await supabase.rpc("get_friends_status", {
    p_user_id: `${userId}`,
  });
  return response;
};

export const getFriend = async (friendUsername: string) => {
  const response = await supabase
    .from("UserStatus")
    .select()
    .eq("display_name", friendUsername)
    .single();
  return response;
};

export const createFriendRequest = async (friendUsername: string) => {
  //get user id
  const { data, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: "Error getting your user data" };
  }
  const userId = data.user.id;
  //get friend id from username
  const { data: friendData, error: friendError } = await getFriend(
    friendUsername
  );
  if (friendError || !friendData) {
    return { data: null, error: `${friendUsername} not found` };
  }
  const friendId = friendData.user_id;
  //add friends to table
  const response = await supabase.from("Friends").insert([
    { user_id: userId, friend_id: friendId, request: "sent" },
    { user_id: friendId, friend_id: userId, request: "received" },
  ]);
  return response;
};

export const acceptFriendRequest = async (friendId: string) => {
  // get the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: "Error getting your user data" };
  }
  const userId = userData.user.id;

  //user side
  const { data: userResponse, error: userUpdateError } = await supabase
    .from("Friends")
    .update({ request: "accepted" })
    .eq("user_id", userId)
    .eq("friend_id", friendId);
  if (userUpdateError) {
    return { data: null, error: "Error updating your friend request status" };
  }

  // friend side
  const { data: friendResponse, error: friendUpdateError } = await supabase
    .from("Friends")
    .update({ request: "accepted" })
    .eq("user_id", friendId)
    .eq("friend_id", userId);
  if (friendUpdateError) {
    return { data: null, error: "Error updating the friend's request status" };
  }
  return { data: { userResponse, friendResponse }, error: null };
};

export const deleteFriend = async (friendId: string) => {
  // get the current user
  console.log(friendId);
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError) {
    return { data: null, error: "Error getting your user data" };
  }
  const userId = userData.user.id;
  console.log(userId);
  //user side
  const { data: userResponse, error: userUpdateError } = await supabase
    .from("Friends")
    .delete()
    .eq("user_id", userId)
    .eq("friend_id", friendId);
  if (userUpdateError) {
    return { data: null, error: "Error deleting your friend" };
  }

  // friend side
  const { data: friendResponse, error: friendUpdateError } = await supabase
    .from("Friends")
    .delete()
    .eq("user_id", friendId)
    .eq("friend_id", userId);
  if (friendUpdateError) {
    return { data: null, error: "Error deleting the friend" };
  }
  return { data: { userResponse, friendResponse }, error: null };
};
