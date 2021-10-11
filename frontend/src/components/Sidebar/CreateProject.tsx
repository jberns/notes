import { SyntheticEvent } from 'react';
import { useProject_CreateMutation } from '../../generated/graphql';
import { ALL_PROJECTS, CORE_PROJECT_FIELDS } from '../../graphql/queries';

export const CreateProject = () => {
  const [createProjectMutation, { data, error, loading }] =
    useProject_CreateMutation({
      refetchQueries: [ALL_PROJECTS],
    });

  async function handleClick(e: SyntheticEvent) {
    e.preventDefault();
    console.log('creating Project');
    const res = await createProjectMutation();
    console.log(res);
  }

  return <button onClick={handleClick}>+</button>;
};
