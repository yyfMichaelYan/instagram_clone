import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:instagram_clone/models/post_model.dart';
import 'package:instagram_clone/models/user_model.dart';
import 'package:instagram_clone/utilities/contants.dart';

class DatabaseService {

  static void updateUser(User user) {
    usersRef.document(user.id).updateData({
      'name': user.name,
      'profileImageUrl': user.profileImageUrl,
      'bio': user.bio
    });
  }

  static Future<QuerySnapshot> searchUsers(String name) {
    Future<QuerySnapshot> users = usersRef.where('name', isGreaterThanOrEqualTo: name).getDocuments();
    return users;
  }

  static void createPost(Post post) {
    postsRef.document(post.authorId).collection('usersPosts').add({
      'imageUrl': post.imageUrl,
      'caption': post.caption,
      'likes': post.likes,
      'authorId': post.authorId,
      'timestamp': post.timestamp
    });
  }

}