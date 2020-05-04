import 'package:instagram_clone/models/user_model.dart';
import 'package:instagram_clone/utilities/contants.dart';

class DataService {

  static void updateUser(User user) {
    usersRef.document(user.id).updateData({
      'name': user.name,
      'profileImageUrl': user.profileImageUrl,
      'bio': user.bio
    });
  }

}