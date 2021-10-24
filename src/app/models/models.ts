export interface Post {
  postId: number;
  userId: number;
  title: string;
  body: string;
  isRead: boolean;
  user: {
    userId: number,
    name: string,
    username: string,
    website: string
  }
}

export interface User {
  userId: number;
  name: string;
  username: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  }
  phone: string,
  website: string,
}

export interface Comment {
  postId: number;
  commentId: number;
  name: string;
  body: string;
  email: string;
}


export interface ServerPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface ServerUser {
  id: number;
  name: string;
  username: string;
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  }
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}

export interface ServerComment {
  id: number;
  commentId: number;
  name: string;
  body: string;
  email: string;
}
