class Api::V1::InvitesController < Api::V1::ApiController
  def requests
    invites = Invite.where("friend_id = #{current_user.id}")
    render status: 200, json: invites
  end

  def show
    begin
      invite = Invite.find(params[:id])
      if (invite.user_id == current_user.id || invite.friend_id == current_user.id)
        render status: 200, json: invite
      else
        render status: 500, json: {error: "You don't have access to this invite"}
      end
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Invite doesn't exist"}
    end
  end

  def create
    begin
      friend = User.find(params[:friend_id])
      if friend.id != current_user.id
        invite = Invite.create!(friend_id: friend.id, user: current_user)
        render status: 201, json: invite
      else
        render status: 500, json: {error: "You can't add yourself!"}
      end
    rescue ActiveRecord::RecordInvalid
      render status: 409, json: {error: "You already invited this user"}
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Friend doesn't exist"}
    end
  end

  def destroy
    begin
      invite = Invite.find(params[:id])
      if (invite.user_id == current_user.id)
        invite.destroy
        render status: 200
      else
        render status: 500, json: {error: "You don't have access to this invite"}
      end
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Invite doesn't exist"}
    end
  end

  def accept
    begin
      invite = Invite.find(params[:invite_id])
      if invite.friend_id == current_user.id
        friend = Friend.create(user: current_user, friend_id: invite.user_id)
        friend = Friend.create(user_id: invite.user_id, friend_id: current_user.id)
        render status: 200, json: {friend: friend}
        invite.destroy
      else
        render status: 500, json: {error: "This invite doesn't belongs to you"}
      end
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Invite doesn't exist"}
    end
  end

  def deny
    begin
      invite = Invite.find(params[:invite_id])
      if invite.friend_id == current_user.id
        invite.destroy
        render status: 200
      else
        render status: 500, json: {error: "This invite doesn't belongs to you"}
      end
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Invite doesn't exist"}
    end
  end
end
