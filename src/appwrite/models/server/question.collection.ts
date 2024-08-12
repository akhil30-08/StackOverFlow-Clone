import { IndexType, Permission } from 'node-appwrite';
import { db, questionCollection } from '../name';
import { databases } from './config';

export default async function createQuestionCollection() {
  // create a new question collection

  await databases.createCollection(db, questionCollection, questionCollection, [
    Permission.read('any'),
    Permission.read('users'),
    Permission.create('users'),
    Permission.update('users'),
    Permission.delete('users'),
  ]);

  console.log('Question collection created');

  // creating attributes and Indexes

  await Promise.all([
    databases.createStringAttribute(db, questionCollection, 'title', 100, true),
    databases.createStringAttribute(db, questionCollection, 'content', 100000, true),
    databases.createStringAttribute(db, questionCollection, 'authorId', 100, true),
    databases.createStringAttribute(db, questionCollection, 'tags', 50, true, undefined, true),
    databases.createStringAttribute(db, questionCollection, 'attachmentId', 50, false),
  ]);

  console.log('Question attributes created');

  // create Index

  await Promise.all([
    databases.createIndex(db, questionCollection, 'title', IndexType.Fulltext, ['title'], ['asc']),

    databases.createIndex(
      db,
      questionCollection,
      'content',
      IndexType.Fulltext,
      ['content'],
      ['asc']
    ),
  ]);
}
