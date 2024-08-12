import { Permission } from 'node-appwrite';
import { answerCollection, db } from '../name';
import { databases } from './config';

export default async function createAnswerCollection() {
  // create a new answer collection

  await databases.createCollection(db, answerCollection, answerCollection, [
    Permission.read('any'),
    Permission.read('users'),
    Permission.create('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ]);

  console.log('answer collection created');

  // creating Attributes

  await Promise.all([
    databases.createStringAttribute(db, answerCollection, 'content', 10000, true),
    databases.createStringAttribute(db, answerCollection, 'questionId', 100, true),
    databases.createStringAttribute(db, answerCollection, 'authorId', 100, true),
  ]);

  console.log('answer attributes');
}
