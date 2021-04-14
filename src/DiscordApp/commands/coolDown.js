class Cooldown
{
	fields = {};
	constructor()
	{
		this.cdMessages = new Set();
	}
	insertUserCd(user, command, cd)
    {
        this.cdMessages.add(user+command);
        setTimeout(() => {
            // Removes the user from the set after a minute
            this.cdMessages.delete(user+command);
          }, cd * 1000);
    }
	checkUserCd(user, command)
	{
		return this.cdMessages.has(user+command);
	}
}

module.exports = Cooldown;