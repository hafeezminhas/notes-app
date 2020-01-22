/**
 * Created by Hafeez Rehman on 20/01/2020.
 */
module.exports = {
	escapeRegex: function escapeRegex (string) {
		return string.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}
};
