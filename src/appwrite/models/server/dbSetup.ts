import { db } from '../name';
import createAnswerCollection from './answer.collection';
import createCommentCollection from './comment.collection';
import createQuestionCollection from './question.collection';
import createVoteCollection from './vote.collection';

import { databases } from './config';

export default async function getOrCreateDb() {
  try {
    await databases.get(db);
    console.log('database connected');
  } catch (error) {
    try {
      await databases.create(db, db);
      console.log('database created');

      // create collections
      await Promise.all([
        createAnswerCollection(),
        createCommentCollection(),
        createVoteCollection(),
        createQuestionCollection(),
      ]);

      console.log('collections created');
      console.log('database connected');
    } catch (error) {
      console.log('error creating database/collection', error);
    }
  }

  return databases;
}
