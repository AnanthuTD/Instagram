"use client";
import React from "react";
import { Avatar, Divider, Button, Card, Row, Col, Typography } from "antd";
import { HeartOutlined, MessageOutlined } from "@ant-design/icons";
import Image from "next/image";
import "./styles.css";

const { Title, Text } = Typography;

interface PostsByHashTagProps {
	params: {
		hashtag: string;
	};
}

const PostsByHashTag: React.FC<PostsByHashTagProps> = ({ params }) => {
	const posts = [
		{
			id: 1,
			imageUrl: "/post1.jpg",
			likes: 100,
			comments: 20,
		},
		{
			id: 2,
			imageUrl: "/post2.jpg",
			likes: 150,
			comments: 30,
		},
		// Add more posts as needed
	];

	return (
		<div className="w-full">
			<Row
				justify="space-between"
				align="middle"
				style={{ marginBottom: 16 }}
				gutter={[16, 16]}
			>
				<Col>
					<Avatar src="/avatar.jpg" size={150}/>
				</Col>
				<Col flex="auto">
					<Row>
						<Title level={1} style={{ marginRight: 8 }}>
							#{params.hashtag}
						</Title>
					</Row>
					<Row>
						<Text style={{ marginRight: 8 }}>{posts.length}</Text>
					</Row>
					<Row>
						<Text style={{ marginRight: 8 }}>Posts</Text>
					</Row>
					<Row>
						<Button type="primary" style={{ width: "100%" }}>
							Follow
						</Button>
					</Row>
				</Col>
			</Row>
			<Divider />
			<Row gutter={[16, 16]}>
				{posts.map((post) => (
					<Col key={post.id} xs={24} sm={12} md={8} lg={8} xl={8}>
						<Card
							bodyStyle={{ padding: 0 }}
							hoverable
							className="post-card"
							cover={
								<div className="image-wrapper">
									<Image
										src={post.imageUrl}
										alt="Post"
										layout="responsive"
										width={400}
										height={300}
									/>
									<div className="overlay">
										<div className="overlay-content flex gap-16">
											<div>
												<HeartOutlined
													style={{ fontSize: "large" }}
												/>
												<span style={{ paddingLeft: 8 }}>
													{post.likes}
												</span>
											</div>
											<div>
												<MessageOutlined
													style={{ fontSize: "large" }}
												/>
												<span style={{ paddingLeft: 8 }}>
													{post.comments}
												</span>
											</div>
										</div>
									</div>
								</div>
							}
						></Card>
					</Col>
				))}
			</Row>
		</div>
	);
};

export default PostsByHashTag;
