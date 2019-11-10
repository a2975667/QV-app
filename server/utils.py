import os
from server import db

def decide_path():
	""" this function decides the json to be used"""
	# possible ways of implementing includes using another db to store the JSON
	# MDB returns the least used json files.
	""
	# QV description
	qv_example = {
		"type":"qv",
		"file":"example"
	}
	qv_test = {
		"type":"normal",
		"file":"test_qv"
	}

	# Phase 1 on charity
	likert_p1 = {
		"type":"normal",
		"file":"likert_p1"
	}
	qv_p1_036 = {
		"type":"qv",
		"file":"qv_p1_36"
	}
	qv_p1_108 = {
		"type":"qv",
		"file":"qv_p1_108"
	}
	qv_p1_324 = {
		"type":"qv",
		"file":"qv_p1_324"
	}

	# Phase 2 on political issue
	likert_p2 = {
		"type":"normal",
		"file":"likert_p2"
	}
	qv_p2_036 = {
		"type":"qv",
		"file":"qv_p2_36"
	}
	qv_p2_108 = {
		"type":"qv",
		"file":"qv_p2_108"
	}
	qv_p2_324 = {
		"type":"qv",
		"file":"qv_p2_324"
	}

	# donation
	donation = {
		"type":"donation",
		"file":"donation"
	}

	# 7 groups
	g1 = [likert_p1, likert_p2, donation]
	g2 = [qv_example, qv_test, qv_p1_036, qv_p1_108, qv_p2_036, qv_p2_108, donation]
	g3 = [qv_example, qv_test, qv_p1_036, qv_p1_324, qv_p2_036, qv_p2_324, donation]
	g4 = [qv_example, qv_test, qv_p1_108, qv_p1_324, qv_p2_108, qv_p2_324, donation]
	g5 = [qv_example, qv_test, qv_p1_108, qv_p1_036, qv_p2_108, qv_p2_036, donation]
	g6 = [qv_example, qv_test, qv_p1_324, qv_p1_036, qv_p2_324, qv_p2_036, donation]
	g7 = [qv_example, qv_test, qv_p1_324, qv_p1_108, qv_p2_324, qv_p2_108, donation]
	g_test = [likert_p1, likert_p2, qv_example, qv_test, qv_p1_036, qv_p1_108, qv_p2_324, qv_p2_036, qv_p2_108, qv_p2_324, donation]

	return g_test
