var domain = "www.naguchi.asia";

angular.module('api.constant', [])

.constant("api", {
  // 初回認証系
  "auth"                    : domain + "/apiAuth/auth.json",
  "gps"                     : domain + "/apiAuth/gps.json",
  "token"                   : domain + "/apiAuth/token.json"
});