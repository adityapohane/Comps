import Table from './Table';
import { GoSortAsc, GoSortDesc, GoUnfold } from "react-icons/go";
import useSort from '../hooks/useSort';

function SortableTable(props) {

  const { config, data } = props;
  const { sortOrder, sortBy, sortedData, setSortColumn } = useSort(
    data,
    config
  );


  
  const updatedConfig = config.map((column) => {
    if (!column.sortValue) {
      return column;
    }

    return {
      ...column,
      header: () => (
        <th
          className="cursor-pointer hover:bg-gray-100"
          onClick={() => setSortColumn(column.label)}
        >
          <div className="flex items-center">
            {getIcons(column.label, sortBy, sortOrder)}
            {column.label}
          </div>
        </th>
      ),
    };
  });



  return (
      <Table {...props} data={sortedData} config={updatedConfig} />
  )
}

function getIcons(label, sortBy, sortOrder) {
  if (label !== sortBy) {
    return (
      <div>
        <GoUnfold />
      </div>
    );
  }
  
  if (sortOrder === null) {
    return (
      <div>
        <GoUnfold />
      </div>
    );
  } else if (sortOrder === 'asc') {
    return (
      <div>
        
        <GoSortDesc />
      </div>
    );
  }
   else if (sortOrder === 'dsc') {
    return (
      <div>
        <GoSortAsc />
      </div>
    );
  }
}
export default SortableTable;
