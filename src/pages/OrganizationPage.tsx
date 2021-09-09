import {
  Stack,
  Box,
  useToast,
  HStack,
  Button,
  Select,
  Flex,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router";
import { organizationApi } from "../api/organizationApi";
import { useAppDispatch } from "../app/hooks";
import Stat from "./../components/Stat";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

const OrganizationPage = () => {
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
          <Button colorScheme="blue" size="md" variant="outline">
            Delete Member
          </Button>
        </Flex>
        <Flex>
          <Select maxW="150">
            <option value="option1">All Employee 1</option>
            <option value="option2"></option>
            <option value="option3"></option>
          </Select>
          <Button colorScheme="blue" size="md">
            Add Member
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
        email: "biden@gmail.com",
        phoneNumber: "1231231231",
        joinDate: "2:30pm",
      },
      {
        name: "Mahathir",
        email: "mahathir@gmail.com",
        phoneNumber: "01123456789",
        joinDate: "11:30am",
      },
      {
        mark: "",
        name: "Donald Trump",
        email: "trump@gmail.com",
        phoneNumber: "0191206709",
        joinDate: "2:00pm",
      },
      {
        name: "Najib Razak",
        email: "chicken@gmail.com",
        phoneNumber: "0167778950",
        joinDate: "1:00pm",
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
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone No.",
        accessor: "phoneNumber",
      },
      {
        Header: "Join Date",
        accessor: "joinDate",
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
            <Th></Th>
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
              <Td>
                <Checkbox colorScheme="green" />
              </Td>
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

export default OrganizationPage;
