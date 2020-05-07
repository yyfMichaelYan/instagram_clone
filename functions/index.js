const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.onFollowUser = functions.firestore
    .document('/followers/{userId}/userFollowers/{followerId}')
    .onCreate(async (snapshot, context) => {
        console.log(snapshot.data);
        const userId = context.params.userId;
        const followerId = context.params.followerId;
        const followedUserPostsRef = admin.firestore().collection('posts').doc(userId).collection('usersPosts');
        const userFeedRef = admin.firestore().collection('feeds').doc(followerId).collection('userFeed');
        const followedUserPostsSnapshot = await followedUserPostsRef.get();
        followedUserPostsSnapshot.forEach(doc => {
            if (doc.exists) {
                userFeedRef.doc(doc.id).set(doc.data());
            }
        });
    });

exports.onUnfollowUser = functions.firestore
    .document('/followers/{userId}/userFollowers/{followerId}')
    .onDelete(async (snapshot, context) => {
        const userId = context.params.userId;
        const followerId = context.params.followerId;
        const userFeedRef = admin.firestore().collection('feeds').doc(followerId).collection('userFeed').where('authorId', '==', userId);
        const userPostsSnapshot = await userFeedRef.get();
        userPostsSnapshot.forEach(doc => {
            if (doc.exists) {
                doc.ref.delete();
            }
        })
    });

exports.onUploadPost = functions.firestore
    .document('/posts/{userId}/usersPosts/{postId}')
    .onCreate(async (snapshot, context) => {
        console.log(snapshot.data());
        const userId = context.params.userId;
        const postId = context.params.postId;
        const userFollowersRef = admin.firestore().collection('followers').doc(userId).collection('userFollowers');
        const userFollowersSnapshot = await userFollowersRef.get();
        userFollowersSnapshot.forEach(doc => {
            admin.firestore().collection('feeds').doc(doc.id).collection('userFeed').doc(postId).set(snapshot.data());
        })
    });



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
