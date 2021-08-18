import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Spinner,
  Center,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormInputType } from "../types/formType";
import { formAPI } from "../api/formAPI"
import { Crypto } from "../utils/crypto/Crypto";
const FormPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputType>({
    defaultValues: {
      company_name: "",
      restaurant_name: "",
      full_name: "",
      contact_number: "",
      address: "",
      website: "",
    },
  });
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormInputType> = async (data) => {
    setIsSubmitLoading((prev) => true);
    try {
      const { data: result } = await formAPI.postRegisterForm(data);
      if (result.success) {
        reset({
          company_name: "",
          restaurant_name: "",
          full_name: "",
          contact_number: "",
          address: "",
          website: "",
        });
        setIsSuccess((prev)=> true);
        setIsSubmitLoading((prev) => false);
      }
    } catch (e) {
      setIsSubmitLoading((prev) => false);
    }
  };
  return (
    <Box position={"relative"}>
      {isSuccess && (
        <Alert status="success" position="fixed">
          <AlertIcon />
          <Box flex="1">
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription display="block">
              Your application has been received. We will review your
              application and respond within the next 48 hours.
            </AlertDescription>
          </Box>
          <CloseButton
            onClick={() => setIsSuccess((prev) => false)}
            position="absolute"
            right="8px"
            top="8px"
          />
        </Alert>
      )}
      <Container
        as={SimpleGrid}
        maxW={"7xl"}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 7, sm: 14, lg: 22 }}
      >
        <Stack spacing={{ base: 10, md: 10 }} pt={10}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "5xl" }}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              MAKE YOUR ONLINE ORDER EASIER & EFFICIENT
            </Text>{" "}
          </Heading>
        </Stack>
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            >
              Want to be a Menuworlds merchant?{"  "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                Register Now!
              </Text>
            </Heading>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
            >
              想要成为Menuworlds的合作商家吗？{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                马上注册!
              </Text>
            </Heading>
            <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
              {/* Some text */}
            </Text>
          </Stack>
          <Box as={"form"} mt={10} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <Stack>
                <Input
                  placeholder="Company Name 公司名称"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("company_name", { required: true })}
                />
                {errors.company_name && (
                  <Text
                    as={"p"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    This field is required.
                  </Text>
                )}
              </Stack>
              <Stack>
                <Input
                  placeholder="Restaurant Name 餐厅名称"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("restaurant_name", { required: true })}
                />
                {errors.restaurant_name && (
                  <Text
                    as={"p"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    This field is required.
                  </Text>
                )}
              </Stack>
              <Stack>
                <Input
                  placeholder="Full Name 全名"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("full_name", { required: true })}
                />
                {errors.full_name && (
                  <Text
                    as={"p"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    This field is required.
                  </Text>
                )}
              </Stack>
              <Stack>
                <Input
                  placeholder="Contact Number 联络号码"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("contact_number", { required: true })}
                />
                {errors.contact_number && (
                  <Text
                    as={"p"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    This field is required.
                  </Text>
                )}
              </Stack>
              <Stack>
                <Input
                  placeholder="Address 地址"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <Text
                    as={"p"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    This field is required.
                  </Text>
                )}
              </Stack>
              <Stack>
                <Input
                  placeholder="Facebook Page / Company Website 面子书专业/公司网站"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{
                    color: "gray.500",
                  }}
                  {...register("website", { required: false })}
                />

                {errors.website && (
                  <Text
                    as={"p"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    This field is required.
                  </Text>
                )}
              </Stack>
              {/* <Button fontFamily={"heading"} bg={"gray.200"} color={"gray.800"}>
                Upload CV
              </Button> */}
            </Stack>
            {!isSubmitLoading && (
              <Button
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                type="submit"
              >
                Submit
              </Button>
            )}
            {isSubmitLoading && (
              <Center>
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="red.400"
                  size="lg"
                  mt={10}
                />
              </Center>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default FormPage;
