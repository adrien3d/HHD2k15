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
      render status: 404, json: {error: "User doesn't exist"}
    end
  end

  def create
    begin
      friend = User.find(params[:friend_id])
      if friend.id != current_user.id
        invite = Invite.create(friend_id: friend.id, user: current_user)
        render status: 200, json: invite
      else
        render status: 500, json: {error: "You can't add yourself!"}
      end
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
      render status: 404, json: {error: "User doesn't exist"}
    end
  end
end
