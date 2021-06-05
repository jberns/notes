import { DP } from '../Dark';
import { IProject, INote, IBlock } from '../../models/Project';

interface ITaskTableProps {
  project: IProject;
}

export const TaskTable = ({ project }: ITaskTableProps) => {
  return (
    <div className="mt-5 overflow-hidden border-b border-gray-900 shadow sm:rounded-lg">
      <table className="w-full divide-y divide-gray-900 table-fixed">
        <thead className={DP.dp12}>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-center text-white uppercase w-28 w-30 opacity-lemp"
            >
              Status
            </th>
            <th
              scope="col"
              className="w-1/2 px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase opacity-lemp"
            >
              Description
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase opacity-lemp"
            >
              Assigned
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase opacity-lemp"
            >
              Due
            </th>
            <th scope="col" className="relative w-1/5 px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className={`divide-y divide-gray-900 ${DP.dp16}`}>
          {project.allTasks().map((block: IBlock) => {
            const { content } = block;
            return (
              <tr key={block.id}>
                <td className="text-sm font-medium text-white opacity-h-emp whitespace-nowrap">
                  <label className="inline-flex w-full">
                    <input
                      type="checkbox"
                      className="w-5 h-5 m-auto text-purple-600 bg-gray-200 rounded form-checkbox"
                      checked={content.complete}
                      onChange={(e) => {
                        content.updateStatus(!content.complete);
                      }}
                    />
                  </label>
                </td>
                <td className="px-6 py-4 text-sm text-white opacity-h-emp">
                  {content.text}
                </td>
                <td className="px-6 py-4 text-sm text-white opacity-h-emp whitespace-nowrap">
                  {content.assignedTo}
                </td>
                <td className="px-6 py-4 text-sm text-white opacity-h-emp whitespace-nowrap">
                  {content.createdOn.toDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                    Edit
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
