import {
  Stack,
  Box,
  useToast,
  HStack,
  Button,
  Select,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router";
import { organizationApi } from "../../api/organizationApi";
import { useAppDispatch } from "../../app/hooks";
import Stat from "../../components/Stat";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

const VisitorPage = () => {
  const history = useHistory();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [organization, setOrganization] = useState();
  useEffect(() => {
    getOrganization();
  }, []);
  let id = "";
  const getOrganization = async () => {
    const result = await organizationApi.getOrganization();
    if (result.status === 200) {
      if (result.data.ownOrganizations.length < 1) {
        history.push("/create-organization");
        toast({
          title: `You have no organization yet, create one!`,
          status: "info",
          isClosable: true,
        });
      } else {
        id = result.data.ownOrganizations[0].id;
        getOrganizationDetail(id);
      }
    } else if (result.status === 401) {
      toast({
        title: result.data.message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Unknown Error, Try again later",
        status: "warning",
        isClosable: true,
      });
    }
  };

  const getOrganizationDetail = async (id: string) => {
    const result = await organizationApi.getOrganizationDetail(id);
    console.log(result);
    if (result.status === 201) {
      setOrganization(result.data);
    } else if (result.status === 401) {
      toast({
        title: result.data.message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Unknown Error, Try again later",
        status: "warning",
        isClosable: true,
      });
    }
  };
  return (
    <Stack mx="8" spacing="20px">
      {organization && <Stat organization={organization} />}{" "}
      <HStack spacing="10px" justifyContent="space-between">
        <Flex>
          <Select maxW="150">
            <option value="option1">Today</option>
            <option value="option2">Last 7 days</option>
            <option value="option3">Last 30 days</option>
          </Select>
        </Flex>
        <Flex>
          <Select maxW="150">
            <option value="option1">All Visitor</option>
            <option value="option2">Employee</option>
            <option value="option3">Visitor</option>
          </Select>
          <Button colorScheme="blue" size="md">
            New Visitor
          </Button>
        </Flex>
      </HStack>
      <Box pt="5" shadow={"lg"} rounded={"lg"}>
        <DataTable></DataTable>
      </Box>
    </Stack>
  );
};

interface ColumnObject {}

function DataTable() {
  const data: Array<any> = useMemo(
    () => [
      {
        name: "Joe Biden",
        role: "Visitor",
        host: "Donald Trump",
        checkIn: "2:30pm",
        checkOut: "3:00pm",
      },
      {
        name: "Mahathir",
        role: "Employee",
        host: "",
        checkIn: "11:30am",
        checkOut: "",
      },
      {
        name: "Donald Trump",
        role: "Employee",
        host: "0191206709",
        checkIn: "10:00am",
        checkOut: "",
      },
      {
        name: "Najib Razak",
        role: "Visitor",
        host: "Donald Trump",
        checkIn: "2:30pm",
        checkOut: "3:00pm",
      },
    ],
    []
  );

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Host by",
        accessor: "host",
      },
      {
        Header: "Check In",
        accessor: "checkIn",
      },
      {
        Header: "Check Out",
        accessor: "checkOut",
      },
    ],
    []
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy
    );

  return (
    <Table {...getTableProps()}>
      <Thead>
        {headerGroups.map((headerGroup) => (
          <Tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <chakra.span pl="4">
                  {column.isSorted ? (
                    column.isSortedDesc ? (
                      <TriangleDownIcon aria-label="sorted descending" />
                    ) : (
                      <TriangleUpIcon aria-label="sorted ascending" />
                    )
                  ) : null}
                </chakra.span>
              </Th>
            ))}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
              ))}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}

export default VisitorPage;
