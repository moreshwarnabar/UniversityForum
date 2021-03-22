class Authorizer {
  constructor() {
    this.rights = {
      admin: ['/admin', '/admin/users', '/admin/answers'],
      student: ['/categories', '/questions', '/answers', '/profile'],
      faculty: ['/categories', '/questions', '/answers', '/profile'],
    };
  }

  isAuthorized(role, path) {
    console.log(role, path);
    return this.rights[role.toLowerCase()].includes(path);
  }

  baseRoute(role) {
    return this.rights[role.toLowerCase()][0];
  }
}

export default new Authorizer();
