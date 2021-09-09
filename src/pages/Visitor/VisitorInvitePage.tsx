import {
  Stack,
  Box,
  useToast,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Icon,
  Heading,
  Select,
  Flex,
} from "@chakra-ui/react";
import { CgChevronLeftO } from "react-icons/cg";
import { useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router";
import { organizationApi } from "../../api/organizationApi";
import { useAppDispatch } from "../../app/hooks";
import Stat from "../../components/Stat";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { useTable, useSortBy, Column } from "react-table";

const VisitorInvitePage = () => {
  const history = useHistory();
  const toast = useToast();
  const dispatch = useAppDispatch();
  const [organization, setOrganization] = useState();
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
        const id = result.data.ownOrganizations[0].id;
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
      <Flex alignItems="center">
        <Icon mr="4" fontSize="22" as={CgChevronLeftO} />
        <Heading as="h3" size="lg">
          New invite
        </Heading>
      </Flex>
      <VStack maxW="450px">
        <FormControl id="Name">
          <FormLabel>Full Name</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input type="email" />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl id="Name">
          <FormLabel>Visitor Type</FormLabel>
          <Input type="text" />
        </FormControl>
        <Stack direction="row" spacing="5">
          <FormControl id="Name">
            <FormLabel>Arrival Date</FormLabel>
            <Input type="text" />
          </FormControl>
          <FormControl id="Name">
            <FormLabel>Arrival Time</FormLabel>
            <Input type="text" />
          </FormControl>
        </Stack>

        <FormControl id="visitor-type">
          <FormLabel>Visitor Type</FormLabel>
          <Select>
            <option>Visitor</option>
            <option>Interview</option>
          </Select>
        </FormControl>
      </VStack>
    </Stack>
  );
};

export default VisitorInvitePage;
